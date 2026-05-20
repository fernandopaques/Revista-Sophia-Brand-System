'use client'

import Link from 'next/link'
import {
  Compass, BookOpen, Eye, Target,
  MessageSquare, Palette, Sparkles,
} from 'lucide-react'
import { PromptArea } from '@/components/home/PromptArea'

const CARDS = [
  {
    label: 'Estratégia de Marca',
    desc: '9 módulos · Onda 1',
    slug: 'auditoria-mercado',
    color: '#B8860B',
    bg: 'rgba(218,165,32,0.18)',
    border: 'rgba(218,165,32,0.40)',
    Icon: Compass,
  },
  {
    label: 'Posicionamento',
    desc: 'Propósito e diferenciação',
    slug: 'posicionamento',
    color: '#9B7300',
    bg: 'rgba(184,134,11,0.16)',
    border: 'rgba(184,134,11,0.38)',
    Icon: Target,
  },
  {
    label: 'Identidade Verbal',
    desc: '9 módulos · Onda 2',
    slug: 'roteiro-da-marca',
    color: '#7B5FAF',
    bg: 'rgba(107,78,143,0.18)',
    border: 'rgba(107,78,143,0.40)',
    Icon: BookOpen,
  },
  {
    label: 'Tom e Voz',
    desc: 'Narrativa e arquétipos',
    slug: 'tom-e-voz',
    color: '#5B3E7F',
    bg: 'rgba(107,78,143,0.14)',
    border: 'rgba(107,78,143,0.35)',
    Icon: MessageSquare,
  },
  {
    label: 'Identidade Visual',
    desc: '10 módulos · Onda 3',
    slug: 'identidade-visual',
    color: '#A0714A',
    bg: 'rgba(196,149,106,0.18)',
    border: 'rgba(196,149,106,0.42)',
    Icon: Eye,
  },
  {
    label: 'Paleta de Cores',
    desc: 'Sistema cromático da marca',
    slug: 'paleta-de-cores',
    color: '#704214',
    bg: 'rgba(112,66,20,0.16)',
    border: 'rgba(112,66,20,0.38)',
    Icon: Palette,
  },
]

export default function HomePage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-wrap">

        {/* Título */}
        <div>
          <h1 className="et-page-title" style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            color: '#1B3A5F',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            marginBottom: '4px',
          }}>
            BRAND SYSTEM
          </h1>
          <p style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            fontStyle: 'italic',
            color: '#DAA520',
            lineHeight: 1.3,
          }}>
            Revista Sophia
          </p>
        </div>

        {/* Bloco IA */}
        <div style={{
          background: 'linear-gradient(135deg, #1B3A5F 0%, #254d7a 100%)',
          borderRadius: '18px',
          padding: 'clamp(18px, 2.5vw, 26px) clamp(20px, 2.5vw, 28px)',
          boxShadow: '0 4px 28px rgba(27,58,95,0.20)',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '6px',
                background: 'rgba(218,165,32,0.18)', border: '1px solid rgba(218,165,32,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={11} color="#DAA520" />
              </div>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(218,165,32,0.70)',
              }}>
                Inteligência da SOPHIA
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(17px, 2vw, 22px)',
              fontWeight: 700,
              color: '#E5DCC7',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 0 4px',
            }}>
              Converse com a <span style={{ color: '#DAA520' }}>SOPHIA</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(12px, 1vw, 13px)',
              color: 'rgba(229,220,199,0.50)',
              lineHeight: 1.4,
              margin: 0,
            }}>
              Quem somos nós? Qual é nossa missão? O que nos move? Pergunte.
            </p>
          </div>

          <PromptArea />
        </div>

        {/* Cards */}
        <div>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(10,15,27,0.35)',
            marginBottom: '10px',
          }}>
            Diretrizes
          </p>

          <div className="et-cards-grid dashboard-cards-grid">
            {CARDS.map(({ label, desc, slug, color, bg, border, Icon }) => (
              <Link key={slug} href={`/brand/${slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="dashboard-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: '#fff',
                    border: `1.5px solid ${border}`,
                    borderRadius: '14px',
                    padding: '18px 22px',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = `1.5px solid ${color}`
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = `0 6px 22px ${color}22`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.border = `1.5px solid ${border}`
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  <div
                    className="dashboard-card-icon"
                    style={{
                      width: '46px', height: '46px',
                      borderRadius: '12px',
                      background: bg,
                      border: `1.5px solid ${color}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      className="dashboard-card-title"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1B3A5F',
                        lineHeight: 1.2,
                        marginBottom: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className="dashboard-card-desc"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '12px',
                        color: 'rgba(10,15,27,0.45)',
                        lineHeight: 1.3,
                      }}
                    >
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
