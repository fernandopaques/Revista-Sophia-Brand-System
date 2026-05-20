import { X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import { SidebarFooter } from './SidebarFooter'
import { SearchModal } from './SearchModal'

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside
      className="flex flex-col h-dvh flex-shrink-0"
      style={{
        background: '#1B3A5F',
        width: '300px',
        borderRight: '2px solid rgba(218,165,32,0.28)',
      }}
    >
      {/* Logo header */}
      <div
        style={{
          borderBottom: '2px solid rgba(218,165,32,0.28)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            padding: '24px 20px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-heading)',
            color: '#DAA520',
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Sophia
          </p>
          <p style={{
            color: 'rgba(229,220,199,0.55)',
            fontSize: '11px',
            marginTop: '6px',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Sistema de Marca
          </p>
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
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(218,165,32,0.1)',
              border: '1px solid rgba(218,165,32,0.25)',
              cursor: 'pointer',
              marginRight: '14px',
              flexShrink: 0,
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.1)' }}
          >
            <X size={18} color="#DAA520" />
          </button>
        )}
      </div>

      <SearchModal />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  )
}
