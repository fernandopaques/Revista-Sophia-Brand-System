'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Instagram, Globe } from 'lucide-react'

type Role = 'admin' | 'staff' | 'gratuito' | null

function WhatsAppIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

export function SectionEncerramento({
  isAuthenticated,
}: {
  isAuthenticated: boolean
  role?: Role
}) {
  const ctaPrimary = {
    href: isAuthenticated ? '/dashboard' : '/login',
    label: 'Brand System',
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
        gap: 'clamp(20px, 3.5vh, 40px)',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 'clamp(20px, 4vh, 48px)',
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

        {/* CTA principal */}
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

        {/* Redes sociais — bloco de destaque */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(27,58,95,0.45)',
          }}>
            Nos siga
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="https://instagram.com/revistasophia" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" style={socialBtnStyle}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.10)'
                el.style.borderColor = 'rgba(27,58,95,0.45)'
                el.style.color = '#1B3A5F'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.05)'
                el.style.borderColor = 'rgba(27,58,95,0.22)'
                el.style.color = 'rgba(27,58,95,0.55)'
              }}
            >
              <Instagram size={20} strokeWidth={1.6} />
            </a>
            <a href="https://wa.me/5561" target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp" style={socialBtnStyle}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.10)'
                el.style.borderColor = 'rgba(27,58,95,0.45)'
                el.style.color = '#1B3A5F'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.05)'
                el.style.borderColor = 'rgba(27,58,95,0.22)'
                el.style.color = 'rgba(27,58,95,0.55)'
              }}
            >
              <WhatsAppIcon size={20} color="currentColor" />
            </a>
            <a href="https://revistasophia.org.br" target="_blank" rel="noopener noreferrer"
              aria-label="Site" style={socialBtnStyle}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.10)'
                el.style.borderColor = 'rgba(27,58,95,0.45)'
                el.style.color = '#1B3A5F'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(27,58,95,0.05)'
                el.style.borderColor = 'rgba(27,58,95,0.22)'
                el.style.color = 'rgba(27,58,95,0.55)'
              }}
            >
              <Globe size={20} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé com redes/contato — cores para fundo claro */}
      <footer style={{
        paddingTop: 'clamp(16px, 2.5vh, 32px)',
        paddingBottom: 'clamp(12px, 2vh, 24px)',
        borderTop: '1px solid rgba(112,66,20,0.22)',
        marginTop: 'clamp(16px, 2.5vh, 32px)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="https://instagram.com/revistasophia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={iconLinkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            <Instagram size={17} strokeWidth={1.6} />
          </a>
          <a
            href="https://wa.me/5561"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={iconLinkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            <WhatsAppIcon size={17} color="currentColor" />
          </a>
          <a
            href="https://revistasophia.org.br"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site"
            style={iconLinkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#DAA520' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,15,27,0.5)' }}
          >
            <Globe size={17} strokeWidth={1.6} />
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
              marginLeft: '8px',
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
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  color: 'rgba(10,15,27,0.5)',
  textDecoration: 'none',
  transition: 'color 180ms ease',
}

const socialBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '52px',
  height: '52px',
  borderRadius: '12px',
  background: 'rgba(27,58,95,0.05)',
  border: '1.5px solid rgba(27,58,95,0.22)',
  color: 'rgba(27,58,95,0.55)',
  textDecoration: 'none',
  transition: 'background 180ms ease, border-color 180ms ease, color 180ms ease',
}
