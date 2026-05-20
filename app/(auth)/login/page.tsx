import { LoginForm } from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar — Brand System Revista Sophia',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>
}) {
  const params = await searchParams
  const message = params.message
  const errorMsg = params.error

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>

      {/* Painel esquerdo — azul profundo decorativo */}
      <div className="login-left-panel" style={{
        width: '72px',
        flexShrink: 0,
        background: '#1B3A5F',
        borderRight: '1px solid rgba(218,165,32,0.18)',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '32px',
      }}>
        <div style={{
          width: '2px',
          height: '120px',
          background: 'linear-gradient(180deg, transparent, rgba(218,165,32,0.6), transparent)',
          borderRadius: '2px',
        }} />
      </div>

      {/* Painel central — formulário */}
      <div className="login-center-panel" style={{
        background: '#F8F4E6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Marca */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#1B3A5F',
              letterSpacing: '0.04em',
            }}>
              Revista Sophia
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '34px',
            fontWeight: 700,
            color: '#0A0F1B',
            lineHeight: 1.1,
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>
            Entrar
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'rgba(10,15,27,0.5)',
            lineHeight: 1.5,
            margin: 0,
          }}>
            Acesse o sistema de marca da Revista Sophia.
          </p>
        </div>

        {/* Mensagem de sucesso (pós-cadastro) */}
        {message && (
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            color: '#155724',
            marginBottom: '20px',
            background: 'rgba(21,87,36,0.07)',
            border: '1px solid rgba(21,87,36,0.2)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            {message}
          </div>
        )}

        {/* Mensagem de erro via URL */}
        {errorMsg && (
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            color: '#8B2635',
            marginBottom: '20px',
            background: 'rgba(139,38,53,0.06)',
            border: '1px solid rgba(139,38,53,0.15)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            {errorMsg}
          </div>
        )}

        {/* Formulário */}
        <LoginForm />

        {/* Rodapé */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          color: 'rgba(10,15,27,0.45)',
          marginTop: '24px',
          textAlign: 'center',
        }}>
          Não tem conta?{' '}
          <a
            href="/signup"
            style={{
              color: '#1B3A5F',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(27,58,95,0.3)',
              paddingBottom: '1px',
            }}
          >
            Criar conta
          </a>
        </p>
      </div>

      {/* Painel direito — gradiente ET */}
      <div className="login-right-panel" style={{
        background: 'linear-gradient(145deg, #0D2340 0%, #1B3A5F 35%, #2C1A4A 65%, #0A0F1B 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Logo centralizado via flexbox */}
        <img
          src="https://soqtksiiztlvsweotylz.supabase.co/storage/v1/object/public/brand-assets/outros/5fe15a95-bb40-4fc5-bc2c-47684039e7f8-LOGO SOPHIA WEB.webp"
          alt="Sophia"
          style={{
            width: '90%',
            height: 'auto',
            display: 'block',
            opacity: 0.95,
            filter: 'drop-shadow(0 8px 32px rgba(218,165,32,0.28))',
          }}
        />

      </div>

    </div>
  )
}
