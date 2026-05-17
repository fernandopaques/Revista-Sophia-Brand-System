import { Info, AlertTriangle, Lightbulb, Quote } from 'lucide-react'
import type { ReactNode, ElementType } from 'react'

type CalloutType = 'note' | 'warning' | 'tip' | 'quote'

interface CalloutProps {
  type?: CalloutType
  children: ReactNode
  title?: string
}

interface CalloutConfig {
  color: string
  bg: string
  Icon: ElementType
  label: string
}

const CONFIG: Record<CalloutType, CalloutConfig> = {
  note: {
    color: '#DAA520',
    bg: 'rgba(218,165,32,0.06)',
    Icon: Info,
    label: 'Nota',
  },
  warning: {
    color: '#704214',
    bg: 'rgba(112,66,20,0.06)',
    Icon: AlertTriangle,
    label: 'Atenção',
  },
  tip: {
    color: '#6B4E8F',
    bg: 'rgba(107,78,143,0.06)',
    Icon: Lightbulb,
    label: 'Dica',
  },
  quote: {
    color: '#DAA520',
    bg: 'transparent',
    Icon: Quote,
    label: '',
  },
}

export function Callout({ type = 'note', children, title }: CalloutProps) {
  const { color, bg, Icon, label } = CONFIG[type]

  // Tipo quote: apenas borda esquerda, sem box, fonte de citação
  if (type === 'quote') {
    return (
      <div
        style={{
          borderLeft: `3px solid ${color}`,
          paddingLeft: '20px',
          margin: '24px 0',
          background: bg,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-quote)',
            fontSize: '20px',
            fontStyle: 'italic',
            color: '#1B3A5F',
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${color}33`,
        borderLeft: `3px solid ${color}`,
        borderRadius: '0 8px 8px 0',
        padding: '16px 20px',
        margin: '24px 0',
      }}
    >
      {/* Header com ícone e label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <Icon size={16} color={color} aria-hidden="true" />
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            fontWeight: 600,
            color,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {title ?? label}
        </span>
      </div>

      {/* Conteúdo */}
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '15px',
          color: '#0A0F1B',
          lineHeight: 1.65,
        }}
      >
        {children}
      </div>
    </div>
  )
}
