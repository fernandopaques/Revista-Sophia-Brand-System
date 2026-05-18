'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NAVIGATION, STANDALONE_ITEMS, EXTERNAL_ITEMS } from '@/lib/navigation'
// Cor dos ícones de onda
const WAVE_ACCENT: Record<string, string> = {
  estrategia: '#DAA520',
  verbal:     '#9B7EC8',
  visual:     '#C4956A',
}

// Detecta qual onda contém o slug ativo
function getActiveWave(pathname: string): string | null {
  const slug = pathname.replace('/brand/', '')
  for (const wave of NAVIGATION) {
    if (wave.modules.some(m => m.slug === slug)) return wave.id
  }
  return null
}

export function SidebarNav() {
  const pathname = usePathname()
  const [openWave, setOpenWave] = useState<string | null>(() => getActiveWave(pathname))

  // Abre a onda certa quando a rota muda (ex: navegação direta por URL)
  useEffect(() => {
    const active = getActiveWave(pathname)
    if (active) setOpenWave(active)
  }, [pathname])

  const toggle = (id: string) => {
    setOpenWave(prev => (prev === id ? null : id))
  }

  return (
    <nav
      className="flex-1 scroll-container overflow-y-auto"
      style={{ padding: '8px 0 12px' }}
      aria-label="Menu principal"
    >

      {/* ── Seção standalone (topo) ─────────────────────────────────────── */}
      {STANDALONE_ITEMS.map(item => {
        // Match exato para raízes ("/" e "/dashboard"), startsWith para o resto
        const isActive = item.href === '/' || item.href === '/dashboard'
          ? pathname === item.href
          : pathname.startsWith(item.href)
        return (
          <NavItem key={item.slug} href={item.href} active={isActive}>
            {item.title}
          </NavItem>
        )
      })}

      <Divider />

      {/* ── Ondas colapsáveis (accordion) ───────────────────────────────── */}
      {NAVIGATION.map(wave => {
        const isOpen   = openWave === wave.id
        const accent   = WAVE_ACCENT[wave.id]
        const hasActive = wave.modules.some(m => pathname === `/brand/${m.slug}`)

        return (
          <div key={wave.id}>
            {/* Cabeçalho da onda */}
            <button
              onClick={() => toggle(wave.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 20px',
                background: hasActive && !isOpen
                  ? 'rgba(218,165,32,0.06)'
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  hasActive && !isOpen ? 'rgba(218,165,32,0.06)' : 'transparent'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: hasActive ? 500 : 400,
                color: isOpen || hasActive
                  ? '#E5DCC7'
                  : 'rgba(229,220,199,0.75)',
                lineHeight: 1.4,
                transition: 'color 150ms ease',
              }}>
                {wave.label}
              </span>

              <ChevronRight
                size={14}
                style={{
                  color: isOpen ? accent : 'rgba(229,220,199,0.4)',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 220ms ease, color 150ms ease',
                  flexShrink: 0,
                }}
              />
            </button>

            {/* Sub-itens (animados com max-height) */}
            <div style={{
              overflow: 'hidden',
              maxHeight: isOpen ? `${wave.modules.length * 40}px` : '0px',
              transition: 'max-height 260ms cubic-bezier(0.4,0,0.2,1)',
            }}>
              {wave.modules.map(mod => {
                const isActive = pathname === `/brand/${mod.slug}`
                return (
                  <Link
                    key={mod.slug}
                    href={`/brand/${mod.slug}`}
                    style={{
                      display: 'block',
                      padding: '8px 20px 8px 32px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive
                        ? '#E5DCC7'
                        : 'rgba(229,220,199,0.6)',
                      background: isActive
                        ? 'rgba(255,255,255,0.09)'
                        : 'transparent',
                      borderLeft: isActive
                        ? `2px solid ${accent}`
                        : '2px solid transparent',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                      transition: 'all 130ms ease',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'rgba(229,220,199,0.9)'
                        el.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'rgba(229,220,199,0.6)'
                        el.style.background = 'transparent'
                      }
                    }}
                  >
                    {mod.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}

      <Divider />

      {/* ── Links externos ────────────────────────────────────────────── */}
      {EXTERNAL_ITEMS.map(item => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(229,220,199,0.7)',
            textDecoration: 'none',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#E5DCC7'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(229,220,199,0.7)'
          }}
        >
          {item.title}
          <ArrowUpRight size={14} style={{ flexShrink: 0, opacity: 0.6 }} />
        </a>
      ))}

    </nav>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div style={{
      margin: '8px 16px',
      height: '1px',
      background: 'rgba(218,165,32,0.18)',
    }} />
  )
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        padding: '10px 20px',
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        fontWeight: active ? 500 : 400,
        color: active ? '#E5DCC7' : 'rgba(229,220,199,0.75)',
        background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
        borderRadius: active ? '6px' : '0',
        margin: active ? '0 8px' : '0',
        textDecoration: 'none',
        transition: 'all 150ms ease',
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.color = '#E5DCC7'
          el.style.background = 'rgba(255,255,255,0.05)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.color = 'rgba(229,220,199,0.75)'
          el.style.background = 'transparent'
        }
      }}
    >
      {children}
    </Link>
  )
}
