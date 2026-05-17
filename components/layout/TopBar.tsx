'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell, LayoutGrid, Compass, BookOpen, Eye,
  Target, MessageSquare, Palette, BookMarked, Layers,
} from 'lucide-react'

const APP_ITEMS = [
  { icon: Compass,      label: 'Estratégia',      slug: '/brand/auditoria-mercado',  color: '#DAA520', bg: 'rgba(218,165,32,0.15)', active: false },
  { icon: Target,       label: 'Posicionamento',   slug: '/brand/posicionamento',     color: '#DAA520', bg: 'rgba(218,165,32,0.12)', active: false },
  { icon: BookOpen,     label: 'Ident. Verbal',    slug: '/brand/roteiro-da-marca',   color: '#9B7EC8', bg: 'rgba(107,78,143,0.15)', active: false },
  { icon: MessageSquare,label: 'Tom e Voz',        slug: '/brand/tom-e-voz',          color: '#9B7EC8', bg: 'rgba(107,78,143,0.12)', active: false },
  { icon: Eye,          label: 'Ident. Visual',    slug: '/brand/identidade-visual',  color: '#C4956A', bg: 'rgba(112,66,20,0.15)',  active: false },
  { icon: Palette,      label: 'Paleta',           slug: '/brand/paleta-de-cores',    color: '#C4956A', bg: 'rgba(112,66,20,0.12)',  active: false },
  { icon: BookMarked,   label: 'Manifesto',        slug: '/brand/manifesto',          color: '#6B4E8F', bg: 'rgba(107,78,143,0.10)', active: false },
  { icon: Layers,       label: 'Grafismos',        slug: '/brand/grafismos',          color: '#704214', bg: 'rgba(112,66,20,0.10)',  active: false },
  { icon: LayoutGrid,   label: 'Brand System',     slug: '/',                         color: '#1B3A5F', bg: 'rgba(27,58,95,0.12)',   active: true  },
]

export function TopBar() {
  const [appsOpen, setAppsOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const appsRef = useRef<HTMLDivElement>(null)
  const bellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) setAppsOpen(false)
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      style={{
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 28px',
        gap: '8px',
        borderBottom: '1px solid rgba(218,165,32,0.18)',
        background: '#E5DCC7',
        flexShrink: 0,
        position: 'relative',
        zIndex: 40,
      }}
    >
      {/* Bell */}
      <div ref={bellRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setBellOpen(v => !v); setAppsOpen(false) }}
          aria-label="Notificações"
          className="topbar-apps-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '8px',
            background: bellOpen ? 'rgba(218,165,32,0.12)' : 'transparent',
            border: `1px solid ${bellOpen ? 'rgba(218,165,32,0.5)' : 'rgba(218,165,32,0.25)'}`,
            cursor: 'pointer', color: '#1B3A5F', transition: 'all 150ms ease',
            position: 'relative',
          }}
        >
          <Bell size={17} />
          {/* badge */}
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#DAA520',
            border: '1.5px solid #E5DCC7',
          }} />
        </button>

        {/* Bell dropdown */}
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: '280px',
          background: '#fff',
          border: '1px solid rgba(218,165,32,0.2)',
          borderRadius: '12px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
          transformOrigin: 'top right',
          transform: bellOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(-8px)',
          opacity: bellOpen ? 1 : 0,
          pointerEvents: bellOpen ? 'auto' : 'none',
          transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 160ms ease',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(218,165,32,0.12)' }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700, color: '#1B3A5F', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Notificações
            </p>
          </div>
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <Bell size={28} style={{ color: 'rgba(27,58,95,0.2)', margin: '0 auto 8px' }} />
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'rgba(10,15,27,0.4)' }}>
              Nenhuma notificação
            </p>
          </div>
        </div>
      </div>

      {/* Grid / App launcher */}
      <div ref={appsRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setAppsOpen(v => !v); setBellOpen(false) }}
          aria-label="Aplicações"
          className="topbar-apps-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '8px',
            background: appsOpen ? 'rgba(218,165,32,0.12)' : 'transparent',
            border: `1px solid ${appsOpen ? 'rgba(218,165,32,0.5)' : 'rgba(218,165,32,0.25)'}`,
            cursor: 'pointer', color: '#1B3A5F', transition: 'all 150ms ease',
          }}
        >
          <LayoutGrid size={17} />
        </button>

        {/* App launcher dropdown */}
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: '276px',
          background: '#fff',
          border: '1px solid rgba(218,165,32,0.2)',
          borderRadius: '14px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
          transformOrigin: 'top right',
          transform: appsOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(-8px)',
          opacity: appsOpen ? 1 : 0,
          pointerEvents: appsOpen ? 'auto' : 'none',
          transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1), opacity 170ms ease',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(218,165,32,0.12)' }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 700, color: '#1B3A5F', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Seções
            </p>
          </div>
          <div style={{ padding: '14px 12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {APP_ITEMS.map(({ icon: Icon, label, slug, color, bg, active }) => (
              <Link key={slug} href={slug} onClick={() => setAppsOpen(false)} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '7px', padding: '12px 6px', borderRadius: '10px',
                    background: active ? 'rgba(27,58,95,0.07)' : 'transparent',
                    border: active ? '1px solid rgba(27,58,95,0.15)' : '1px solid transparent',
                    cursor: 'pointer', transition: 'background 140ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = active ? 'rgba(27,58,95,0.1)' : 'rgba(218,165,32,0.07)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = active ? 'rgba(27,58,95,0.07)' : 'transparent' }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: bg, border: `1px solid ${color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '11px',
                    color: '#1B3A5F', textAlign: 'center', lineHeight: 1.3,
                    fontWeight: active ? 600 : 400,
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
