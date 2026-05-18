'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react'

type Role = 'admin' | 'staff' | 'gratuito' | null

const SECTIONS = [
  { id: 'capa',             num: '00', label: 'Capa' },
  { id: 'por-que-sophia',   num: '01', label: 'Por que Sophia' },
  { id: 'manifesto',        num: '02', label: 'Manifesto' },
  { id: 'o-que-nos-move',   num: '03', label: 'O que nos move' },
  { id: 'o-nome',           num: '04', label: 'O Nome' },
  { id: 'encerramento',     num: '05', label: 'Encerramento' },
] as const

interface Props {
  children: React.ReactNode
  isAuthenticated: boolean
  role: Role
}

export function PublicShell({ children, isAuthenticated, role }: Props) {
  const [activeId, setActiveId] = useState<string>('capa')
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ctaPrimary = isAuthenticated
    ? { href: '/dashboard', label: 'Ir para Dashboard' }
    : { href: '/login', label: 'Entrar' }
  const ctaSecondary =
    role === 'admin' ? { href: '/assets', label: 'Gestão de Ativos' } : null

  // Active section via IntersectionObserver — root é o scroll container
  useEffect(() => {
    const scrollRoot = document.getElementById('public-scroll-root')
    if (!scrollRoot) return

    observerRef.current = new IntersectionObserver(
      entries => {
        // Pega a entry mais "central" — maior intersectionRatio entre as visíveis
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: scrollRoot,
        // Considera "ativa" quando a seção cruza a faixa central da viewport
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
        className="desktop-only"
        aria-label="Navegação do brand book"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '240px',
          padding: '72px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          zIndex: 30,
          pointerEvents: 'auto',
        }}
      >
        <SidebarHeader />

        <NavList
          sections={SECTIONS}
          activeId={activeId}
          onItemClick={scrollToSection}
        />

        <div style={{ flex: 1 }} />

        <SidebarCTAs
          primary={ctaPrimary}
          secondary={ctaSecondary}
        />
      </aside>

      {/* ════════ HAMBURGER MOBILE ════════ */}
      {!menuOpen && (
        <button
          className="mobile-only"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu de navegação"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(218,165,32,0.10)',
            border: '1px solid rgba(218,165,32,0.30)',
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
              'rgba(218,165,32,0.20)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'rgba(218,165,32,0.10)'
          }}
        >
          <Menu size={22} strokeWidth={1.8} />
        </button>
      )}

      {/* ════════ MOBILE OVERLAY ════════ */}
      <div
        className="mobile-only"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1B3A5F',
          zIndex: 50,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
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

        {/* Items centralizados verticalmente */}
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

          {/* CTAs mobile */}
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

            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  height: '44px',
                  padding: '0 18px',
                  background: 'transparent',
                  color: '#E5DCC7',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid rgba(218,165,32,0.30)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {ctaSecondary.label}
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ════════ CONTEÚDO PRINCIPAL ════════ */}
      <main
        style={{
          paddingLeft: 0,
        }}
      >
        {children}
      </main>
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

function SidebarHeader() {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        fontWeight: 700,
        color: '#DAA520',
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
      }}>
        Sophia
      </p>
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '11px',
        color: 'rgba(229,220,199,0.45)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginTop: '4px',
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
}: {
  sections: typeof SECTIONS
  activeId: string
  onItemClick: (id: string) => void
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
              transition: 'color 220ms ease',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                const labelEl = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (labelEl) labelEl.style.color = 'rgba(229,220,199,0.90)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                const labelEl = (e.currentTarget as HTMLButtonElement).querySelector('span[data-role="label"]') as HTMLElement | null
                if (labelEl) labelEl.style.color = 'rgba(229,220,199,0.50)'
              }
            }}
          >
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              fontWeight: 500,
              color: isActive ? '#DAA520' : 'rgba(229,220,199,0.35)',
              letterSpacing: '0.08em',
              fontVariantNumeric: 'tabular-nums',
              transition: 'color 220ms ease',
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
                color: isActive ? '#DAA520' : 'rgba(229,220,199,0.50)',
                letterSpacing: '0.01em',
                transition: 'color 220ms ease',
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
  secondary,
}: {
  primary: { href: string; label: string }
  secondary: { href: string; label: string } | null
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(218,165,32,0.18)',
    }}>
      <Link
        href={primary.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '10px 14px',
          background: 'rgba(218,165,32,0.10)',
          color: '#DAA520',
          fontFamily: 'var(--font-ui)',
          fontSize: '13px',
          fontWeight: 600,
          border: '1px solid rgba(218,165,32,0.30)',
          borderRadius: '8px',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          transition: 'background 180ms ease, border-color 180ms ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'rgba(218,165,32,0.18)'
          el.style.borderColor = 'rgba(218,165,32,0.50)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'rgba(218,165,32,0.10)'
          el.style.borderColor = 'rgba(218,165,32,0.30)'
        }}
      >
        {primary.label}
        <ArrowRight size={14} />
      </Link>

      {secondary && (
        <Link
          href={secondary.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '8px 14px',
            background: 'transparent',
            color: 'rgba(229,220,199,0.70)',
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            fontWeight: 500,
            border: '1px solid transparent',
            borderRadius: '8px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'color 180ms ease, border-color 180ms ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.color = '#E5DCC7'
            el.style.borderColor = 'rgba(218,165,32,0.20)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.color = 'rgba(229,220,199,0.70)'
            el.style.borderColor = 'transparent'
          }}
        >
          {secondary.label}
          <ArrowUpRight size={14} />
        </Link>
      )}
    </div>
  )
}
