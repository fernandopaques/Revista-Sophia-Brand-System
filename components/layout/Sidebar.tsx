import Image from 'next/image'
import Link from 'next/link'
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
        <Link
          href="/dashboard"
          className="sidebar-logo-btn"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1,
            padding: '20px',
          }}
          title="Voltar à página inicial"
        >
          <Image
            src="/assets/logo-et.png"
            alt="Revista Sophia"
            width={62}
            height={62}
            className="flex-shrink-0"
            priority
          />
          <div>
            <p style={{
              fontFamily: 'var(--font-heading)',
              color: '#DAA520',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '0.06em',
            }}>
              REVISTA
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              color: '#DAA520',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '0.06em',
            }}>
              SOPHIA
            </p>
            <p style={{
              color: 'rgba(229,220,199,0.6)',
              fontSize: '12px',
              marginTop: '4px',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.02em',
            }}>
              Sistema de Marca
            </p>
          </div>
        </Link>

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
