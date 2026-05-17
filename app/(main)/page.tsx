'use client'

import Link from 'next/link'
import {
  Compass, BookOpen, Eye, Target,
  MessageSquare, Palette,
} from 'lucide-react'
import { PromptArea } from '@/components/home/PromptArea'

const CARDS = [
  {
    label: 'Estratégia de Marca',
    desc: '9 módulos · Onda 1',
    slug: 'auditoria-mercado',
    color: '#DAA520',
    bg: 'rgba(218,165,32,0.14)',
    border: 'rgba(218,165,32,0.28)',
    Icon: Compass,
  },
  {
    label: 'Posicionamento',
    desc: 'Propósito e diferenciação',
    slug: 'posicionamento',
    color: '#B8860B',
    bg: 'rgba(184,134,11,0.12)',
    border: 'rgba(184,134,11,0.25)',
    Icon: Target,
  },
  {
    label: 'Identidade Verbal',
    desc: '9 módulos · Onda 2',
    slug: 'roteiro-da-marca',
    color: '#9B7EC8',
    bg: 'rgba(107,78,143,0.14)',
    border: 'rgba(107,78,143,0.28)',
    Icon: BookOpen,
  },
  {
    label: 'Tom e Voz',
    desc: 'Narrativa e arquétipos',
    slug: 'tom-e-voz',
    color: '#6B4E8F',
    bg: 'rgba(107,78,143,0.10)',
    border: 'rgba(107,78,143,0.22)',
    Icon: MessageSquare,
  },
  {
    label: 'Identidade Visual',
    desc: '10 módulos · Onda 3',
    slug: 'identidade-visual',
    color: '#C4956A',
    bg: 'rgba(196,149,106,0.14)',
    border: 'rgba(196,149,106,0.28)',
    Icon: Eye,
  },
  {
    label: 'Paleta de Cores',
    desc: 'Sistema cromático da marca',
    slug: 'paleta-de-cores',
    color: '#704214',
    bg: 'rgba(112,66,20,0.12)',
    border: 'rgba(112,66,20,0.25)',
    Icon: Palette,
  },
]

export default function HomePage() {
  return (
    <div className="scroll-container h-full" style={{ overflowY: 'auto' }}>
      <div className="et-page-padding" style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Título */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="et-page-title" style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: '#1B3A5F',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '8px',
          }}>
            BRAND SYSTEM
          </h1>
          <p style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: '20px',
            fontStyle: 'italic',
            color: '#DAA520',
            lineHeight: 1.4,
            marginBottom: '10px',
          }}>
            Editora Teosófica
          </p>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
            color: 'rgba(10,15,27,0.45)',
            lineHeight: 1.7,
            maxWidth: '480px',
          }}>
            Sistema completo de marca. Navegue pelas seções abaixo.
          </p>
        </div>

        {/* Prompt */}
        <div style={{ marginBottom: '48px' }}>
          <PromptArea />
        </div>

        {/* Cards 2 colunas */}
        <div>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(10,15,27,0.35)',
            marginBottom: '14px',
          }}>
            Diretrizes
          </p>

          <div className="et-cards-grid">
            {CARDS.map(({ label, desc, slug, color, bg, border, Icon }) => (
              <Link
                key={slug}
                href={`/brand/${slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: '#F5F1E8',
                    border: `1px solid ${border}`,
                    borderRadius: '14px',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = `1px solid ${color}55`
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = `0 6px 20px ${color}14`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = `1px solid ${border}`
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Ícone quadrado */}
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: bg,
                    border: `1px solid ${color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color={color} />
                  </div>

                  {/* Texto */}
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1B3A5F',
                      lineHeight: 1.3,
                      marginBottom: '3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '12px',
                      color: 'rgba(10,15,27,0.45)',
                      lineHeight: 1.4,
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
