import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex h-dvh overflow-hidden"
      style={{ background: '#E5DCC7' }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 scroll-container overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
