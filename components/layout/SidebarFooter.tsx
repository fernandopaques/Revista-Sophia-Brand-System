'use client'
import { useState, useRef, useEffect } from 'react'
import { Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

const MOCK_USER = { name: 'Paques', plan: 'Gratuito' }

function UserAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B3A5F 0%, #2a5080 100%)',
        border: '2px solid rgba(218,165,32,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-ui)',
        fontWeight: 700,
        fontSize: size * 0.38,
        color: '#DAA520',
        letterSpacing: '0.02em',
      }}
    >
      {initial}
    </div>
  )
}

export function SidebarFooter() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div
      ref={ref}
      style={{ position: 'relative', flexShrink: 0 }}
    >
      {/* Popover menu */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '12px',
          right: '12px',
          background: '#1a2d47',
          border: '1px solid rgba(218,165,32,0.25)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          transformOrigin: 'bottom center',
          transform: open ? 'scaleY(1) translateY(0)' : 'scaleY(0.85) translateY(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 180ms ease',
        }}
      >
        {/* User info top */}
        <div
          style={{
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(218,165,32,0.15)',
          }}
        >
          <UserAvatar name={MOCK_USER.name} size={36} />
          <span
            style={{
              color: '#E5DCC7',
              fontSize: '14px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
            }}
          >
            {MOCK_USER.name}
          </span>
        </div>

        {/* Menu items */}
        <Link
          href="/settings"
          onClick={() => setOpen(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'transparent',
            color: 'rgba(229,220,199,0.85)',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            borderBottom: '1px solid rgba(218,165,32,0.10)',
            transition: 'background 150ms ease, color 150ms ease',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(218,165,32,0.08)'
            el.style.color = '#E5DCC7'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.color = 'rgba(229,220,199,0.85)'
          }}
        >
          <Settings size={16} style={{ flexShrink: 0, color: 'rgba(218,165,32,0.7)' }} />
          Configurações
        </Link>

        <button
          onClick={() => setOpen(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(229,220,199,0.85)',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            transition: 'background 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.08)'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#E5DCC7'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(229,220,199,0.85)'
          }}
        >
          <LogOut size={16} style={{ flexShrink: 0, color: 'rgba(218,165,32,0.7)' }} />
          Desconectar
        </button>

        {/* Plan info bottom */}
        <div
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderTop: '1px solid rgba(218,165,32,0.15)',
          }}
        >
          <UserAvatar name={MOCK_USER.name} size={32} />
          <div>
            <p style={{ color: '#E5DCC7', fontSize: '13px', fontFamily: 'var(--font-ui)', fontWeight: 500, lineHeight: 1.3 }}>
              {MOCK_USER.name}
            </p>
            <p style={{ color: 'rgba(229,220,199,0.45)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>
              {MOCK_USER.plan}
            </p>
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '16px 20px',
          background: open ? 'rgba(218,165,32,0.08)' : 'transparent',
          border: 'none',
          borderTop: '2px solid rgba(218,165,32,0.3)',
          cursor: 'pointer',
          transition: 'background 150ms ease',
          textAlign: 'left',
        }}
        onMouseEnter={e => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.06)'
        }}
        onMouseLeave={e => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        }}
      >
        <UserAvatar name={MOCK_USER.name} size={40} />
        <div style={{ minWidth: 0 }}>
          <p style={{
            color: '#E5DCC7',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {MOCK_USER.name}
          </p>
          <p style={{
            color: 'rgba(229,220,199,0.45)',
            fontSize: '12px',
            fontFamily: 'var(--font-ui)',
          }}>
            {MOCK_USER.plan}
          </p>
        </div>
      </button>
    </div>
  )
}
