export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="public-scroll-root"
      className="scroll-container"
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: '#1B3A5F',
        color: '#E5DCC7',
      }}
    >
      {children}
    </div>
  )
}
