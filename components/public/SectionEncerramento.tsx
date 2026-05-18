'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mail, Instagram } from 'lucide-react'

type Role = 'admin' | 'staff' | 'gratuito' | null

export function SectionEncerramento({
  isAuthenticated,
}: {
  isAuthenticated: boolean
  role?: Role
}) {
  // Sempre "Dashboard"; logado vai direto, sem sessão passa pelo login (com opção criar conta)
  const ctaPrimary = {
    href: isAuthenticated ? '/dashboard' : '/login',
    label: 'Dashboard',
  }

  return (
    <section
      id="encerramento"
      className="public-section public-section--invert"
      style={{
        justifyContent: 'space-between',
      }}
    >
      <div className="public-section-inner--wide" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(40px, 6vw, 80px)',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 'clamp(40px, 8vh, 96px)',
        textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#704214',
        }}>
          05 — Encerramento
        </p>

        {/* Frase de fechamento centralizada */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 6.5vw, 5rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#1B3A5F',
            marginBottom: '24px',
          }}>
            A travessia continua.
          </h2>
          <p style={{
            fontFamily: 'var(--font-quote)',
            fontSize: 'clamp(1.25rem, 2.4vw, 1.875rem)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: '#704214',
            maxWidth: '34ch',
            margin: '0 auto',
          }}>
            Em breve, todo o universo Sophia em um único lugar.
          </p>
        </div>

        {/* CTAs centralizadas — bg azul pra contrastar com fundo claro */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: 'center',
        }}>
          <Link
            href={ctaPrimary.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              height: '52px',
              padding: '0 28px',
              background: '#1B3A5F',
              color: '#E5DCC7',
              fontFamily: 'var(--font-ui)',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '10px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 180ms ease, transform 180ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#254d7a'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#1B3A5F'
              el.style.transform = 'translateY(0)'
            }}
          >
            {ctaPrimary.label}
            <ArrowRight size={17} />
          </Link>

        </div>
      </div>

      {/* Rodapé com redes/contato — cores para fundo claro */}
      <footer style={{
        paddingTop: 'clamp(32px, 5vh, 64px)',
        paddingBottom: 'clamp(16px, 3vh, 32px)',
        borderTop: '1px solid rgba(112,66,20,0.22)',
        marginTop: 'clamp(40px, 6vh, 80px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
      }} className="public-section-inner--wide">
        {/* Identificação */}
        <div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 700,
            color: '#1B3A5F',
            letterSpacing: '-0.01em',
          }}>
            Sophia
          </p>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            color: 'rgba(10,15,27,0.5)',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}>
            Sociedade Teosófica no Brasil · Brasília
          </p>
        </div>

        {/* Redes & contato */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={iconLinkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            <Instagram size={18} strokeWidth={1.6} />
          </a>
          <a
            href="mailto:contato@revistasophia.org"
            aria-label="Email"
            style={iconLinkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            <Mail size={18} strokeWidth={1.6} />
          </a>
          <a
            href="https://sociedadeteosofica.org.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '12px',
              color: 'rgba(10,15,27,0.5)',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            sociedadeteosofica.org.br
            <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </section>
  )
}

const iconLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: '8px',
  color: 'rgba(10,15,27,0.5)',
  textDecoration: 'none',
  transition: 'color 180ms ease',
}
