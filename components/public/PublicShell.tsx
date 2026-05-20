'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, ChevronUp, Instagram, Globe } from 'lucide-react'

function WhatsAppIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

type Role = 'admin' | 'staff' | 'gratuito' | null

const SECTIONS = [
  { id: 'capa',             num: '00', label: 'Capa'             },
  { id: 'por-que-sophia',   num: '01', label: 'Por que Sophia'   },
  { id: 'manifesto',        num: '02', label: 'Manifesto'        },
  { id: 'o-que-nos-move',   num: '03', label: 'O que nos move'   },
  { id: 'o-nome',           num: '04', label: 'O Nome'           },
  { id: 'encerramento',     num: '05', label: 'Encerramento'     },
] as const

type Palette = {
  titleAccent:    string
  subtitleMuted:  string
  numActive:      string
  numInactive:    string
  labelActive:    string
  labelInactive:  string
  labelHover:     string
  divider:        string
  ctaBg:          string
  ctaBgHover:     string
  ctaBorder:      string
  ctaBorderHover: string
  ctaText:        string
}

// Seções escuras (00, 02, 04) → sidebar gold
const PALETTE_DARK: Palette = {
  titleAccent:        '#DAA520',
  subtitleMuted:      'rgba(218,165,32,0.55)',
  numActive:          '#DAA520',
  numInactive:        'rgba(218,165,32,0.45)',
  labelActive:        '#DAA520',
  labelInactive:      'rgba(218,165,32,0.60)',
  labelHover:         'rgba(218,165,32,0.90)',
  divider:            'rgba(218,165,32,0.35)',
  ctaBg:              'rgba(218,165,32,0.12)',
  ctaBgHover:         'rgba(218,165,32,0.22)',
  ctaBorder:          'rgba(218,165,32,0.45)',
  ctaBorderHover:     'rgba(218,165,32,0.70)',
  ctaText:            '#DAA520',
}

// Seções claras (01, 03, 05) → sidebar azul profundo para contrastar com o creme
const PALETTE_LIGHT: Palette = {
  titleAccent:        '#1B3A5F',
  subtitleMuted:      'rgba(27,58,95,0.55)',
  numActive:          '#1B3A5F',
  numInactive:        'rgba(27,58,95,0.38)',
  labelActive:        '#1B3A5F',
  labelInactive:      'rgba(27,58,95,0.52)',
  labelHover:         'rgba(27,58,95,0.85)',
  divider:            'rgba(27,58,95,0.22)',
  ctaBg:              'rgba(27,58,95,0.08)',
  ctaBgHover:         'rgba(27,58,95,0.16)',
  ctaBorder:          'rgba(27,58,95,0.35)',
  ctaBorderHover:     'rgba(27,58,95,0.58)',
  ctaText:            '#1B3A5F',
}

const LIGHT_SECTION_IDS = new Set(['por-que-sophia', 'o-que-nos-move', 'encerramento'])

interface Props {
  children: React.ReactNode
  isAuthenticated: boolean
  role: Role
}

export function PublicShell({ children, isAuthenticated }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideY, setSlideY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const currentIndexRef = useRef(0)

  const activeId = SECTIONS[currentIndex].id
  const palette = LIGHT_SECTION_IDS.has(activeId) ? PALETTE_LIGHT : PALETTE_DARK

  const ctaPrimary = {
    href: isAuthenticated ? '/dashboard' : '/login',
    label: 'Brand System',
  }

  // Mantém ref sincronizada para event handlers sem re-registrar listeners
  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])

  // Mede o offsetTop real de uma seção no DOM para evitar acúmulo de erro
  // quando seções têm altura != 100dvh (min-height pode ser maior)
  const getOffset = (idx: number) => {
    const el = document.getElementById(SECTIONS[idx].id)
    return el ? el.offsetTop : idx * window.innerHeight
  }

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= SECTIONS.length) return
    setSlideY(getOffset(idx))
    setCurrentIndex(idx)
    setMenuOpen(false)
  }

  const scrollToSection = (id: string) => {
    goTo(SECTIONS.findIndex(s => s.id === id))
  }

  // Wheel scroll — desktop (seção por seção com lock anti-disparo múltiplo)
  useEffect(() => {
    const root = document.getElementById('public-scroll-root')
    if (!root) return
    let locked = false
    const onWheel = (e: WheelEvent) => {
      if (locked) return
      const next = currentIndexRef.current + (e.deltaY > 0 ? 1 : -1)
      if (next < 0 || next >= SECTIONS.length) return
      locked = true
      const el = document.getElementById(SECTIONS[next].id)
      setSlideY(el ? el.offsetTop : next * window.innerHeight)
      setCurrentIndex(next)
      currentIndexRef.current = next
      setTimeout(() => { locked = false }, 820)
    }
    root.addEventListener('wheel', onWheel, { passive: true })
    return () => root.removeEventListener('wheel', onWheel)
  }, [])

  // Swipe vertical — mobile
  useEffect(() => {
    const root = document.getElementById('public-scroll-root')
    if (!root) return
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY
      if (Math.abs(diff) < 44) return
      const next = currentIndexRef.current + (diff > 0 ? 1 : -1)
      if (next >= 0 && next < SECTIONS.length) {
        const el = document.getElementById(SECTIONS[next].id)
        setSlideY(el ? el.offsetTop : next * window.innerHeight)
        setCurrentIndex(next)
      }
    }
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  // ESC fecha overlay
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [menuOpen])

  return (
    <>
      {/* ════════ SIDEBAR DESKTOP ════════ */}
      <aside
        className="public-shell-sidebar"
        aria-label="Navegação do brand book"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '240px',
          padding: '56px 32px 40px',
          flexDirection: 'column',
          zIndex: 30,
          pointerEvents: 'auto',
        }}
      >
        <SidebarHeader palette={palette} />

        <div style={{ margin: 'auto 0' }}>
          <NavList
            sections={SECTIONS}
            activeId={activeId}
            onItemClick={scrollToSection}
            palette={palette}
          />
        </div>

        <SidebarCTAs primary={ctaPrimary} palette={palette} />
      </aside>

      {/* ════════ HAMBURGER MOBILE ════════ */}
      {!menuOpen && (
        <button
          className="public-shell-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu de navegação"
          style={{
            position: 'fixed',
            top: '20px',
            // Na capa (index 0) fica centralizado; nas demais desliza para a direita
            left: currentIndex === 0 ? 'calc(50% - 22px)' : 'calc(100% - 64px)',
            width: '44px',
            height: '44px',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(218,165,32,0.12)',
            border: '1px solid rgba(218,165,32,0.35)',
            borderRadius: '10px',
            cursor: 'pointer',
            color: '#DAA520',
            zIndex: 40,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'left 420ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.22)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.12)' }}
        >
          <Menu size={22} strokeWidth={1.8} />
        </button>
      )}

      {/* ════════ VOLTAR À CAPA — só na última seção, mobile ════════ */}
      <button
        className="public-shell-hamburger"
        onClick={() => goTo(0)}
        aria-label="Voltar à capa"
        style={{
          position: 'fixed',
          top: '20px',
          left: 'calc(50% - 18px)',
          width: '36px',
          height: '36px',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(218,165,32,0.10)',
          border: '1px solid rgba(218,165,32,0.30)',
          borderRadius: '50%',
          cursor: 'pointer',
          color: '#DAA520',
          zIndex: 40,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: !menuOpen && currentIndex === SECTIONS.length - 1 ? 1 : 0,
          pointerEvents: !menuOpen && currentIndex === SECTIONS.length - 1 ? 'auto' : 'none',
          transition: 'opacity 320ms ease, background 180ms ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.20)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.10)' }}
      >
        <ChevronUp size={15} strokeWidth={1.8} />
      </button>

      {/* ════════ MOBILE OVERLAY ════════ */}
      <div
        className="public-shell-menu"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1B3A5F',
          zIndex: 50,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          flexDirection: 'column',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{
              width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent',
              border: '1px solid rgba(218,165,32,0.30)',
              borderRadius: '10px', cursor: 'pointer', color: '#DAA520',
              transition: 'background 180ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.10)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
          >
            <X size={22} strokeWidth={1.8} />
          </button>
        </div>

        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: 'clamp(24px, 8vw, 64px)', gap: '24px',
        }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              style={{
                background: 'none', border: 'none', padding: '8px 0',
                cursor: 'pointer', display: 'flex', alignItems: 'baseline',
                gap: '14px', textAlign: 'left',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 380ms ease ${100 + i * 40}ms, transform 380ms ease ${100 + i * 40}ms`,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 500,
                color: activeId === s.id ? '#DAA520' : 'rgba(229,220,199,0.40)',
                letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums',
              }}>
                {s.num}
              </span>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 600,
                color: activeId === s.id ? '#DAA520' : '#E5DCC7',
                letterSpacing: '-0.01em', lineHeight: 1.2,
              }}>
                {s.label}
              </span>
            </button>
          ))}

          <div style={{
            marginTop: '32px', paddingTop: '24px',
            borderTop: '1px solid rgba(218,165,32,0.18)',
            display: 'flex', flexDirection: 'column', gap: '16px',
            width: '100%', maxWidth: '320px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 380ms ease ${100 + SECTIONS.length * 40}ms, transform 380ms ease ${100 + SECTIONS.length * 40}ms`,
          }}>
            <Link
              href={ctaPrimary.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'space-between', gap: '12px',
                height: '48px', padding: '0 18px',
                background: '#DAA520', color: '#1B3A5F',
                fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600,
                borderRadius: '8px', textDecoration: 'none', letterSpacing: '0.02em',
              }}
            >
              {ctaPrimary.label}
              <ArrowRight size={16} />
            </Link>

            {/* Ícones sociais */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://instagram.com/revistasophia', label: 'Instagram', icon: <Instagram size={17} strokeWidth={1.6} /> },
                { href: 'https://wa.me/5561', label: 'WhatsApp', icon: <WhatsAppIcon size={17} color="currentColor" /> },
                { href: 'https://revistasophia.org.br', label: 'Site', icon: <Globe size={17} strokeWidth={1.6} /> },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '44px', height: '44px',
                    background: 'rgba(218,165,32,0.10)',
                    border: '1px solid rgba(218,165,32,0.30)',
                    borderRadius: '10px',
                    color: 'rgba(218,165,32,0.70)',
                    textDecoration: 'none',
                    transition: 'background 180ms ease, color 180ms ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(218,165,32,0.20)'
                    el.style.color = '#DAA520'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = 'rgba(218,165,32,0.10)'
                    el.style.color = 'rgba(218,165,32,0.70)'
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ════════ CONTEÚDO PRINCIPAL ════════ */}
      <main style={{ height: '100dvh', overflow: 'hidden' }}>
        <div style={{
          transform: `translateY(-${slideY}px)`,
          transition: 'transform 680ms cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
        }}>
          {children}
        </div>
      </main>
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

function SidebarHeader({ palette }: { palette: Palette }) {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '18px', fontWeight: 700,
        color: palette.titleAccent,
        letterSpacing: '-0.01em', lineHeight: 1.1,
        transition: 'color 280ms ease',
      }}>
        Sophia
      </p>
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '11px', color: palette.subtitleMuted,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        marginTop: '4px', transition: 'color 280ms ease',
      }}>
        Brand Book
      </p>
    </div>
  )
}

function NavList({
  sections, activeId, onItemClick, palette,
}: {
  sections: typeof SECTIONS
  activeId: string
  onItemClick: (id: string) => void
  palette: Palette
}) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {sections.map(s => {
        const isActive = activeId === s.id
        return (
          <button
            key={s.id}
            onClick={() => onItemClick(s.id)}
            style={{
              background: 'none', border: 'none', padding: '8px 0',
              cursor: 'pointer', display: 'flex', alignItems: 'baseline',
              gap: '10px', textAlign: 'left', transition: 'color 280ms ease',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                const el = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (el) el.style.color = palette.labelHover
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                const el = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (el) el.style.color = palette.labelInactive
              }
            }}
          >
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 500,
              color: isActive ? palette.numActive : palette.numInactive,
              letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums',
              transition: 'color 280ms ease', minWidth: '22px',
            }}>
              {s.num}
            </span>
            <span
              data-role="label"
              style={{
                fontFamily: 'var(--font-ui)', fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? palette.labelActive : palette.labelInactive,
                letterSpacing: '0.01em', transition: 'color 280ms ease',
              }}
            >
              {s.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function SidebarCTAs({
  primary, palette,
}: {
  primary: { href: string; label: string }
  palette: Palette
}) {
  return (
    <div style={{
      paddingTop: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      {/* Divisor curto */}
      <div style={{
        width: '32px', height: '1px',
        background: palette.divider,
        marginBottom: '4px',
        transition: 'background 280ms ease',
      }} />
      <Link
        href={primary.href}
        style={{
          display: 'inline-flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '8px',
          width: 'fit-content', padding: '6px 10px',
          background: palette.ctaBg, color: palette.ctaText,
          fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 600,
          border: `1px solid ${palette.ctaBorder}`,
          borderRadius: '6px', textDecoration: 'none',
          letterSpacing: '0.04em', boxSizing: 'border-box',
          transition: 'background 280ms ease, border-color 280ms ease, color 280ms ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = palette.ctaBgHover
          el.style.borderColor = palette.ctaBorderHover
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = palette.ctaBg
          el.style.borderColor = palette.ctaBorder
        }}
      >
        {primary.label}
        <ArrowRight size={11} />
      </Link>

      {/* Ícones sociais */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[
          { href: 'https://instagram.com/revistasophia', label: 'Instagram', icon: <Instagram size={12} strokeWidth={1.6} /> },
          { href: 'https://wa.me/5561', label: 'WhatsApp', icon: <WhatsAppIcon size={12} color="currentColor" /> },
          { href: 'https://revistasophia.org.br', label: 'Site', icon: <Globe size={12} strokeWidth={1.6} /> },
        ].map(item => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '26px', height: '26px',
              background: palette.ctaBg,
              border: `1px solid ${palette.ctaBorder}`,
              borderRadius: '6px',
              color: palette.ctaText,
              textDecoration: 'none',
              transition: 'background 280ms ease, border-color 280ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = palette.ctaBgHover
              el.style.borderColor = palette.ctaBorderHover
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = palette.ctaBg
              el.style.borderColor = palette.ctaBorder
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
