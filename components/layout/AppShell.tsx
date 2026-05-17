'use client'
import { useState, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on navigation
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: '#E5DCC7' }}>

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
      <div className={`app-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar onMenuOpen={openSidebar} />
        <main className="flex-1 scroll-container overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
