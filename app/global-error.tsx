'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: '#F8F4E6', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          gap: '16px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(10,15,27,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Algo deu errado
          </p>
          <h1 style={{ fontSize: '28px', color: '#1B3A5F', margin: 0, fontWeight: 700 }}>
            Erro inesperado
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(10,15,27,0.5)', maxWidth: '360px', lineHeight: 1.6, margin: 0 }}>
            Ocorreu um problema ao carregar esta página. Tente novamente.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '8px',
              padding: '10px 24px',
              background: '#1B3A5F',
              color: '#E5DCC7',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
          <a href="/" style={{ fontSize: '13px', color: '#1B3A5F', opacity: 0.6 }}>
            Voltar ao início
          </a>
        </div>
      </body>
    </html>
  )
}
