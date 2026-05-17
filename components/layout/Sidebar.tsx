import Image from 'next/image'
import Link from 'next/link'
import { SidebarNav } from './SidebarNav'
import { SidebarFooter } from './SidebarFooter'
import { SearchModal } from './SearchModal'

export function Sidebar() {
  return (
    <aside
      className="flex flex-col h-dvh flex-shrink-0"
      style={{
        background: '#1B3A5F',
        width: '300px',
        borderRight: '2px solid rgba(218,165,32,0.28)',
      }}
    >
      {/* Logo — link para home */}
      <Link
        href="/"
        style={{ textDecoration: 'none' }}
        title="Voltar à página inicial"
      >
        <div
          className="sidebar-logo-btn flex items-center gap-4 px-5 py-5"
          style={{ borderBottom: '2px solid rgba(218,165,32,0.28)' }}
        >
          <Image
            src="/assets/logo-et.png"
            alt="Editora Teosófica"
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
              EDITORA
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)',
              color: '#DAA520',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '0.06em',
            }}>
              TEOSÓFICA
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
        </div>
      </Link>

      <SearchModal />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  )
}
