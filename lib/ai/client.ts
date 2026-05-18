/**
 * OpenRouter streaming client for the Revista Sophia Brand System.
 * Sends messages to OpenRouter and returns a ReadableStream of SSE chunks.
 */

export type Message = { role: 'user' | 'assistant' | 'system'; content: string }

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'
const DEFAULT_MODEL = 'google/gemma-3-27b-it'

export async function streamChat(
  messages: Message[],
  systemPrompt: string
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENROUTER_API_KEY

  // If no API key, return a stream with a helpful error message
  if (!apiKey || apiKey.trim() === '') {
    const encoder = new TextEncoder()
    const errorMsg =
      'Configuração incompleta: a variável OPENROUTER_API_KEY não está definida. ' +
      'Por favor, adicione sua chave da OpenRouter no arquivo .env.local para usar o assistente de marca.'

    return new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: {"content":"${errorMsg}"}\n\n`)
        )
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })
  }

  const model = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL

  const allMessages: Message[] = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ]

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:3001',
      'X-Title': 'Revista Sophia Brand System',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: allMessages,
      stream: true,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `OpenRouter request failed [${response.status}]: ${errorBody}`
    )
  }

  if (!response.body) {
    throw new Error('OpenRouter response has no body')
  }

  // Return the raw SSE stream — the caller (route.ts) will parse and re-stream
  return response.body
}
