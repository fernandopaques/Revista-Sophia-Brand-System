'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NAVIGATION } from '@/lib/navigation'
import type { NavModule } from '@/lib/navigation'

const WAVE_LABELS: Record<string, string> = {
  estrategia: 'Estratégia',
  verbal: 'Identidade Verbal',
  visual: 'Identidade Visual',
}

const WAVE_COLORS: Record<string, string> = {
  estrategia: '#DAA520',
  verbal: '#9B7EC8',
  visual: '#C4956A',
}

const ALL_MODULES: NavModule[] = NAVIGATION.flatMap(w => w.modules)

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { setMounted(true) }, [])

  const open = useCallback(() => {
    setIsOpen(true)
    setQuery('')
    setActiveIdx(0)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isOpen ? close() : open()
      }
      if (e.key === 'Escape' && isOpen) close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, open, close])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 40)
  }, [isOpen])

  const results = query.trim()
    ? ALL_MODULES.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_MODULES.slice(0, 8)

  const navigate = useCallback((slug: string) => {
    router.push(`/brand/${slug}`)
    close()
  }, [router, close])

  useEffect(() => { setActiveIdx(0) }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && results[activeIdx]) {
      navigate(results[activeIdx].slug)
    }
  }

  const modal = isOpen ? (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '72px',
        background: 'rgba(10,15,27,0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#162d4a',
          borderRadius: '16px',
          border: '1px solid rgba(218,165,32,0.28)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(218,165,32,0.06)',
          overflow: 'hidden',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Barra de busca */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '18px 22px',
          borderBottom: '1px solid rgba(218,165,32,0.12)',
        }}>
          <Search size={20} color='rgba(218,165,32,0.65)' style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar módulos de marca..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-ui)',
              fontSize: '17px',
              color: '#E5DCC7',
            }}
          />
          <kbd style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            color: 'rgba(229,220,199,0.3)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '5px',
            padding: '3px 7px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
            onClick={close}
          >
            ESC
          </kbd>
        </div>

        {/* Label */}
        <div style={{ padding: '12px 22px 6px' }}>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(229,220,199,0.3)',
          }}>
            {query.trim() ? `${results.length} resultado${results.length !== 1 ? 's' : ''}` : 'Módulos'}
          </p>
        </div>

        {/* Resultados */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', paddingBottom: '8px' }}>
          {results.length > 0 ? results.map((mod, idx) => (
            <button
              key={mod.slug}
              onClick={() => navigate(mod.slug)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '11px 22px',
                background: idx === activeIdx ? 'rgba(218,165,32,0.1)' : 'transparent',
                border: 'none',
                borderLeft: idx === activeIdx ? '3px solid #DAA520' : '3px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 100ms ease',
              }}
              onMouseEnter={() => setActiveIdx(idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: WAVE_COLORS[mod.wave],
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '15px',
                    color: idx === activeIdx ? '#DAA520' : '#E5DCC7',
                    fontWeight: idx === activeIdx ? 500 : 400,
                    transition: 'color 100ms ease',
                  }}>
                    {mod.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '12px',
                    color: WAVE_COLORS[mod.wave],
                    opacity: 0.75,
                    marginTop: '2px',
                  }}>
                    {WAVE_LABELS[mod.wave]}
                  </p>
                </div>
              </div>
              <ArrowRight size={14} color={idx === activeIdx ? '#DAA520' : 'rgba(229,220,199,0.2)'} />
            </button>
          )) : (
            <div style={{ padding: '32px 22px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'rgba(229,220,199,0.35)',
              }}>
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(218,165,32,0.1)',
          padding: '10px 22px',
          display: 'flex',
          gap: '16px',
        }}>
          {[
            { key: '↑↓', label: 'navegar' },
            { key: '↵', label: 'abrir' },
            { key: 'ESC', label: 'fechar' },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <kbd style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                color: 'rgba(229,220,199,0.4)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                padding: '2px 5px',
              }}>{key}</kbd>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                color: 'rgba(229,220,199,0.3)',
              }}>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      {/* Botão no sidebar */}
      <button
        onClick={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: 'calc(100% - 28px)',
          margin: '10px 14px',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(218,165,32,0.18)',
          borderRadius: '9px',
          cursor: 'pointer',
          transition: 'all 150ms ease',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = 'rgba(218,165,32,0.08)'
          el.style.borderColor = 'rgba(218,165,32,0.35)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = 'rgba(255,255,255,0.05)'
          el.style.borderColor = 'rgba(218,165,32,0.18)'
        }}
      >
        <Search size={15} color='rgba(229,220,199,0.45)' />
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          color: 'rgba(229,220,199,0.45)',
          flex: 1,
          textAlign: 'left',
        }}>
          Buscar...
        </span>
        <kbd style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          color: 'rgba(229,220,199,0.28)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          padding: '2px 6px',
        }}>
          ⌘K
        </kbd>
      </button>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  )
}
