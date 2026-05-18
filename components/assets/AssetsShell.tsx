'use client'

import { useState, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { AssetsSidebar } from './AssetsSidebar'

export function AssetsShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const openSidebar  = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden', background: '#F8F4E6' }}>

      {/* Mobile backdrop */}
      <div
        aria-hidden
        className="mobile-only"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 49,
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
        onClick={closeSidebar}
      />

      {/* Sidebar — static on desktop, drawer on mobile */}
      <div className={`assets-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <AssetsSidebar onClose={closeSidebar} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Mobile top bar */}
        <div
          className="mobile-only"
          style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '14px',
            borderBottom: '1px solid rgba(218,165,32,0.18)',
            background: '#F8F4E6',
            flexShrink: 0,
          }}
        >
          <button
            onClick={openSidebar}
            aria-label="Abrir menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#1B3A5F',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 150ms ease',
            }}
          >
            <Menu size={22} color="#DAA520" />
          </button>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
            fontWeight: 600,
            color: '#1B3A5F',
          }}>
            Gestão de Ativos
          </span>
        </div>

        <main style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
