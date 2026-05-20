'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { ArrowRight, Loader2, User, Sparkles } from 'lucide-react'

type Role = 'user' | 'assistant'
type Message = { role: Role; content: string; id: string }

function UserBubble({ content }: { content: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '80%' }}>
        <div style={{
          background: '#1B3A5F',
          color: '#E5DCC7',
          borderRadius: '14px 14px 4px 14px',
          padding: '10px 14px',
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}>
          {content}
        </div>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: '#1B3A5F', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0, marginTop: '2px',
        }}>
          <User size={14} color="#E5DCC7" />
        </div>
      </div>
    </div>
  )
}

function AssistantBubble({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '88%' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'rgba(218,165,32,0.15)', border: '1px solid rgba(218,165,32,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: '2px',
        }}>
          <Sparkles size={14} color="#DAA520" />
        </div>
        <div style={{
          background: 'rgba(218,165,32,0.10)',
          border: '1px solid rgba(218,165,32,0.25)',
          borderRadius: '4px 14px 14px 14px',
          padding: '10px 14px',
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          lineHeight: 1.7,
          color: '#E5DCC7',
          whiteSpace: 'pre-wrap',
        }}>
          {content || <span style={{ opacity: 0.4 }}>…</span>}
          {streaming && (
            <span style={{
              display: 'inline-block',
              width: '2px', height: '14px',
              background: '#DAA520',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

export function PromptArea() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const textareaRef             = useRef<HTMLTextAreaElement>(null)
  const scrollRef               = useRef<HTMLDivElement>(null)
  const abortRef                = useRef<AbortController | null>(null)

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleInput = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text, id: crypto.randomUUID() }
    const assistantId = crypto.randomUUID()

    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: '', id: assistantId }])
    setInput('')
    setLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }))

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const raw = trimmed.slice('data:'.length).trim()
          if (raw === '[DONE]') break

          try {
            const parsed = JSON.parse(raw) as { content?: string; error?: string }
            if (parsed.error) {
              accumulated = parsed.error
            } else if (parsed.content) {
              accumulated += parsed.content
            }
            const snap = accumulated
            setMessages(prev =>
              prev.map(m => m.id === assistantId ? { ...m, content: snap } : m)
            )
          } catch {
            // skip malformed chunk
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: 'Erro ao conectar com o assistente. Tente novamente.' }
              : m
          )
        )
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }, [input, loading, messages])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  const hasMessages = messages.length > 0

  return (
    <div style={{
      width: '100%',
      background: 'rgba(255,255,255,0.06)',
      border: '1.5px solid rgba(218,165,32,0.30)',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Cabeçalho — visível apenas quando há mensagens */}
      {hasMessages && (
        <div style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(218,165,32,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Sparkles size={14} color="#DAA520" />
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(229,220,199,0.55)',
          }}>
            Sophia · Assistente de Marca
          </span>
        </div>
      )}

      {/* Área de mensagens */}
      {hasMessages && (
        <div
          ref={scrollRef}
          style={{
            padding: '16px 16px 8px',
            maxHeight: '420px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {messages.map((msg, i) =>
            msg.role === 'user'
              ? <UserBubble key={msg.id} content={msg.content} />
              : <AssistantBubble
                  key={msg.id}
                  content={msg.content}
                  streaming={loading && i === messages.length - 1}
                />
          )}
        </div>
      )}

      {/* Input */}
      <div style={{
        position: 'relative',
        padding: '14px 60px 14px 18px',
        borderTop: hasMessages ? '1px solid rgba(218,165,32,0.15)' : 'none',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => { setInput(e.target.value); handleInput() }}
          onKeyDown={handleKeyDown}
          placeholder={hasMessages ? 'Continue a conversa…' : 'Pergunte à SOPHIA…'}
          className="prompt-dark-input"
          rows={2}
          disabled={loading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
            color: '#E5DCC7',
            lineHeight: 1.6,
            minHeight: '52px',
            maxHeight: '160px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            opacity: loading ? 0.5 : 1,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          aria-label="Enviar pergunta"
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '12px',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: (input.trim() && !loading) ? '#DAA520' : 'rgba(218,165,32,0.2)',
            border: 'none',
            cursor: (input.trim() && !loading) ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 150ms ease',
            flexShrink: 0,
          }}
        >
          {loading
            ? <Loader2 size={16} color="rgba(27,58,95,0.5)" style={{ animation: 'spin 1s linear infinite' }} />
            : <ArrowRight size={18} color={input.trim() ? '#1B3A5F' : 'rgba(27,58,95,0.35)'} />
          }
        </button>
      </div>

      {/* CSS para animações */}
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
