'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'

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

// Paleta única gold-based: contrasta tanto com seções escuras (azul profundo)
// quanto claras (creme), eliminando a transição entre seções que estava criando
// delay perceptível ao usuário ao rolar.
const PALETTE: Palette = {
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

interface Props {
  children: React.ReactNode
  isAuthenticated: boolean
  role: Role
}

export function PublicShell({ children, isAuthenticated }: Props) {
  const [activeId, setActiveId] = useState<string>('capa')
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Sempre "Dashboard"; logado vai direto, sem sessão passa pelo login
  const ctaPrimary = {
    href: isAuthenticated ? '/dashboard' : '/login',
    label: 'Dashboard',
  }

  // Paleta única — sem troca por seção, evita delay perceptível
  const palette = PALETTE

  // Active section via IntersectionObserver — root é o scroll container
  useEffect(() => {
    const scrollRoot = document.getElementById('public-scroll-root')
    if (!scrollRoot) return

    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: scrollRoot,
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  // Trava scroll do container quando o overlay mobile está aberto
  useEffect(() => {
    const scrollRoot = document.getElementById('public-scroll-root')
    if (!scrollRoot) return
    scrollRoot.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => { scrollRoot.style.overflow = 'auto' }
  }, [menuOpen])

  // ESC fecha overlay
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [menuOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

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

        {/* Nav centralizada verticalmente entre header e CTAs */}
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
            right: '20px',
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
            transition: 'background 180ms ease, transform 180ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'rgba(218,165,32,0.22)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'rgba(218,165,32,0.12)'
          }}
        >
          <Menu size={22} strokeWidth={1.8} />
        </button>
      )}

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
        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: '1px solid rgba(218,165,32,0.30)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: '#DAA520',
              transition: 'background 180ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(218,165,32,0.10)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            }}
          >
            <X size={22} strokeWidth={1.8} />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 'clamp(24px, 8vw, 64px)',
            gap: '24px',
          }}
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 380ms ease ${100 + i * 40}ms, transform 380ms ease ${100 + i * 40}ms`,
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                fontWeight: 500,
                color: activeId === s.id ? '#DAA520' : 'rgba(229,220,199,0.40)',
                letterSpacing: '0.06em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {s.num}
              </span>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 5vw, 28px)',
                fontWeight: 600,
                color: activeId === s.id ? '#DAA520' : '#E5DCC7',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                {s.label}
              </span>
            </button>
          ))}

          {/* CTA mobile */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(218,165,32,0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            width: '100%',
            maxWidth: '320px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 380ms ease ${100 + SECTIONS.length * 40}ms, transform 380ms ease ${100 + SECTIONS.length * 40}ms`,
          }}>
            <Link
              href={ctaPrimary.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                height: '48px',
                padding: '0 18px',
                background: '#DAA520',
                color: '#1B3A5F',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '8px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              {ctaPrimary.label}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ════════ CONTEÚDO PRINCIPAL ════════ */}
      <main>{children}</main>
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

function SidebarHeader({ palette }: { palette: Palette }) {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 700,
        color: palette.titleAccent,
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        transition: 'color 280ms ease',
      }}>
        Sophia
      </p>
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '11px',
        color: palette.subtitleMuted,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginTop: '4px',
        transition: 'color 280ms ease',
      }}>
        Brand Book
      </p>
    </div>
  )
}

function NavList({
  sections,
  activeId,
  onItemClick,
  palette,
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
              background: 'none',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'baseline',
              gap: '10px',
              textAlign: 'left',
              transition: 'color 280ms ease',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                const labelEl = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (labelEl) labelEl.style.color = palette.labelHover
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                const labelEl = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (labelEl) labelEl.style.color = palette.labelInactive
              }
            }}
          >
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              fontWeight: 500,
              color: isActive ? palette.numActive : palette.numInactive,
              letterSpacing: '0.08em',
              fontVariantNumeric: 'tabular-nums',
              transition: 'color 280ms ease',
              minWidth: '22px',
            }}>
              {s.num}
            </span>
            <span
              data-role="label"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? palette.labelActive : palette.labelInactive,
                letterSpacing: '0.01em',
                transition: 'color 280ms ease',
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
  primary,
  palette,
}: {
  primary: { href: string; label: string }
  palette: Palette
}) {
  return (
    <div style={{
      paddingTop: '24px',
      borderTop: `1px solid ${palette.divider}`,
      transition: 'border-color 280ms ease',
    }}>
      <Link
        href={primary.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          width: '100%',
          padding: '10px 14px',
          background: palette.ctaBg,
          color: palette.ctaText,
          fontFamily: 'var(--font-ui)',
          fontSize: '13px',
          fontWeight: 600,
          border: `1px solid ${palette.ctaBorder}`,
          borderRadius: '8px',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          boxSizing: 'border-box',
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
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}
