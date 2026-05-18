/**
 * POST /api/chat
 *
 * SSE streaming chat endpoint for the Revista Sophia Brand System AI assistant.
 * Receives a conversation history, performs RAG retrieval, and proxies the
 * OpenRouter stream back to the client in our normalized SSE format.
 *
 * Request:  { messages: {role: 'user'|'assistant', content: string}[] }
 * Response: text/event-stream
 *   - Chunks:  data: {"content":"..."}\n\n
 *   - End:     data: [DONE]\n\n
 *   - Errors:  data: {"error":"..."}\n\n  followed by  data: [DONE]\n\n
 */

import { NextRequest } from 'next/server'
import { streamChat, type Message } from '@/lib/ai/client'
import { getRelevantContext } from '@/lib/ai/rag'
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt'

// Prevent Next.js from caching this dynamic route
export const dynamic = 'force-dynamic'

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
} as const

/**
 * Pipes the raw OpenRouter SSE stream through a TransformStream,
 * parsing OpenRouter's format and re-emitting our normalized SSE format.
 */
async function pipeStream(
  openRouterStream: ReadableStream<Uint8Array>,
  writer: WritableStreamDefaultWriter<Uint8Array>,
  encoder: TextEncoder
): Promise<void> {
  const decoder = new TextDecoder()
  const reader = openRouterStream.getReader()

  // Buffer for incomplete SSE lines that arrive across chunk boundaries
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // Process all complete lines in the buffer
      const lines = buffer.split('\n')
      // Keep the last (potentially incomplete) segment in the buffer
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue

        const raw = trimmed.slice('data:'.length).trim()

        if (raw === '[DONE]') {
          await writer.write(encoder.encode('data: [DONE]\n\n'))
          return
        }

        try {
          const parsed = JSON.parse(raw) as {
            choices?: Array<{ delta?: { content?: string } }>
          }
          const content = parsed.choices?.[0]?.delta?.content
          if (content !== undefined && content !== null) {
            const escaped = JSON.stringify(content)
            await writer.write(
              encoder.encode(`data: {"content":${escaped}}\n\n`)
            )
          }
        } catch {
          // Skip malformed JSON lines — OpenRouter occasionally sends comments
        }
      }
    }

    // Flush any remaining buffer content
    if (buffer.trim().startsWith('data:')) {
      const raw = buffer.trim().slice('data:'.length).trim()
      if (raw === '[DONE]') {
        await writer.write(encoder.encode('data: [DONE]\n\n'))
        return
      }
    }

    // Ensure we always close with a [DONE] signal
    await writer.write(encoder.encode('data: [DONE]\n\n'))
  } finally {
    reader.releaseLock()
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const encoder = new TextEncoder()

  try {
    const body = (await request.json()) as { messages?: Message[] }
    const messages = body.messages

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'messages array is required and cannot be empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Extract the most recent user message for RAG retrieval
    const lastUserMsg =
      messages.findLast((m) => m.role === 'user')?.content ?? ''

    // Retrieve relevant brand documents via keyword scoring
    const ragContext = getRelevantContext(lastUserMsg)

    // Compose the final system prompt with optional RAG context
    const finalSystem = ragContext
      ? `${SYSTEM_PROMPT}\n\n${ragContext}`
      : SYSTEM_PROMPT

    // Filter out any existing system messages — we inject our own
    const filteredMessages = messages.filter((m) => m.role !== 'system')

    // Get the raw OpenRouter SSE stream
    const openRouterStream = await streamChat(filteredMessages, finalSystem)

    // Set up our TransformStream to re-format OpenRouter SSE into our format
    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()

    // Kick off piping without awaiting — return the readable immediately so
    // the client starts receiving chunks as they arrive
    pipeStream(openRouterStream, writer, encoder)
      .catch(async (err) => {
        console.error('[/api/chat] Stream pipe error:', err)
        try {
          await writer.write(
            encoder.encode(
              'data: {"error":"Erro ao processar a resposta do modelo"}\n\n'
            )
          )
          await writer.write(encoder.encode('data: [DONE]\n\n'))
        } catch {
          // Writer may already be closed — ignore
        }
      })
      .finally(async () => {
        try {
          await writer.close()
        } catch {
          // Already closed — ignore
        }
      })

    return new Response(readable, { headers: SSE_HEADERS })
  } catch (err) {
    console.error('[/api/chat] Handler error:', err)

    // Return an SSE error stream so the client's reader doesn't break
    const errorStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'data: {"error":"Erro ao processar a sua mensagem. Tente novamente."}\n\n'
          )
        )
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(errorStream, { headers: SSE_HEADERS })
  }
}
