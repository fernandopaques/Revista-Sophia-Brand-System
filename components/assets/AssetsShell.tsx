'use client'

import { AssetsSidebar } from './AssetsSidebar'

export function AssetsShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden', background: '#E5DCC7' }}>
      <AssetsSidebar />
      <main style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {children}
      </main>
    </div>
  )
}
