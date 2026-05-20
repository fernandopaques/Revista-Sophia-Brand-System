'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LayoutDashboard, BookOpen, FolderOpen, Instagram, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function WhatsAppIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

const STANDALONE_ICONS: Record<string, LucideIcon> = {
  home:   LayoutDashboard,
  public: BookOpen,
  assets: FolderOpen,
}
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
          <NavItem key={item.slug} href={item.href} active={isActive} highlight icon={STANDALONE_ICONS[item.slug]}>
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

      {/* ── Ícones sociais ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', padding: '10px 20px' }}>
        {[
          { href: 'https://instagram.com/revistasophia', label: 'Instagram', icon: <Instagram size={14} strokeWidth={1.7} /> },
          { href: 'https://wa.me/5561', label: 'WhatsApp', icon: <WhatsAppIcon size={14} color="currentColor" /> },
          { href: 'https://revistasophia.org.br', label: 'Site', icon: <Globe size={14} strokeWidth={1.7} /> },
        ].map(item => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px',
              background: 'rgba(218,165,32,0.08)',
              border: '1px solid rgba(218,165,32,0.20)',
              borderRadius: '8px',
              color: 'rgba(218,165,32,0.55)',
              textDecoration: 'none',
              transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(218,165,32,0.16)'
              el.style.color = '#DAA520'
              el.style.borderColor = 'rgba(218,165,32,0.45)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(218,165,32,0.08)'
              el.style.color = 'rgba(218,165,32,0.55)'
              el.style.borderColor = 'rgba(218,165,32,0.20)'
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>

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
  highlight,
  icon: Icon,
  children,
}: {
  href: string
  active: boolean
  highlight?: boolean
  icon?: LucideIcon
  children: React.ReactNode
}) {
  const inactiveColor = highlight ? 'rgba(218,165,32,0.70)' : 'rgba(229,220,199,0.65)'
  const activeColor   = highlight ? '#DAA520'               : '#E5DCC7'
  const hoverColor    = highlight ? 'rgba(218,165,32,0.92)' : '#E5DCC7'

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px 19px',
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        fontWeight: active ? 600 : highlight ? 500 : 400,
        color: active ? activeColor : inactiveColor,
        background: 'transparent',
        border: active ? '1px solid rgba(218,165,32,0.40)' : '1px solid transparent',
        borderRadius: '6px',
        margin: '0 8px',
        textDecoration: 'none',
        transition: 'all 150ms ease',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.color = hoverColor
          el.style.borderColor = highlight ? 'rgba(218,165,32,0.20)' : 'rgba(255,255,255,0.10)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.color = inactiveColor
          el.style.borderColor = 'transparent'
        }
      }}
    >
      {children}
      {Icon && (
        <Icon size={14} style={{ opacity: active ? 0.9 : 0.55, flexShrink: 0 }} />
      )}
    </Link>
  )
}
