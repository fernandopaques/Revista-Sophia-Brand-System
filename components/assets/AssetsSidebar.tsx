'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Hexagon,
  Palette,
  Type,
  Image,
  Video,
  Music,
  FileText,
  Package,
  ArrowLeft,
  X,
} from 'lucide-react'

const ASSET_TYPES = [
  { slug: 'logotipos',  label: 'Logotipos',   icon: Hexagon   },
  { slug: 'cores',      label: 'Cores',        icon: Palette   },
  { slug: 'tipografia', label: 'Tipografia',   icon: Type      },
  { slug: 'imagens',    label: 'Imagens',      icon: Image     },
  { slug: 'videos',     label: 'Vídeos',       icon: Video     },
  { slug: 'audios',     label: 'Áudios',       icon: Music     },
  { slug: 'documentos', label: 'Documentos',   icon: FileText  },
  { slug: 'outros',     label: 'Outros',       icon: Package   },
]

export function AssetsSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside
      style={{
        width: '240px',
        flexShrink: 0,
        background: '#1B3A5F',
        borderRight: '2px solid rgba(218,165,32,0.25)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: 700,
              color: '#DAA520',
              lineHeight: 1,
            }}
          >
            ET
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(229,220,199,0.85)',
              lineHeight: 1.3,
            }}
          >
            Gestão de Ativos
          </span>
        </div>

        {/* Close button — mobile only */}
        {onClose && (
          <button
            className="mobile-only"
            onClick={onClose}
            aria-label="Fechar menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(218,165,32,0.1)',
              border: '1px solid rgba(218,165,32,0.25)',
              cursor: 'pointer',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.1)' }}
          >
            <X size={16} color="#DAA520" />
          </button>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(229,220,199,0.6)',
          fontFamily: 'var(--font-ui)',
          fontSize: '13px',
          textAlign: 'left',
          width: '100%',
          transition: 'color 150ms ease',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(229,220,199,0.9)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(229,220,199,0.6)'
        }}
      >
        <ArrowLeft size={14} />
        Voltar
      </button>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(218,165,32,0.2)',
          margin: '4px 16px 8px',
        }}
      />

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '4px 8px' }}>
        {ASSET_TYPES.map(({ slug, label, icon: Icon }) => {
          const href = `/assets/${slug}`
          const isActive = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <Link
              key={slug}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                marginBottom: '2px',
                textDecoration: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#E5DCC7' : 'rgba(229,220,199,0.7)',
                background: isActive ? 'rgba(218,165,32,0.15)' : 'transparent',
                borderLeft: isActive ? '2px solid #DAA520' : '2px solid transparent',
                transition: 'background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    'rgba(255,255,255,0.06)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                }
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
