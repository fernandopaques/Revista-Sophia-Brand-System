import Image from 'next/image'
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
      }}>
        {/* Glow dourado atrás do logo */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(218,165,32,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo centralizado */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}>
          <Image
            src="/assets/logo-et.png"
            alt="Revista Sophia"
            width={200}
            height={200}
            style={{ opacity: 0.88, filter: 'drop-shadow(0 8px 32px rgba(218,165,32,0.22))' }}
          />
        </div>

        {/* Slogan */}
        <div style={{
          position: 'absolute',
          bottom: '52px',
          right: '52px',
          textAlign: 'right',
          pointerEvents: 'none',
        }}>
          <p style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: '22px',
            fontWeight: 600,
            fontStyle: 'italic',
            color: '#DAA520',
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: '0.01em',
            textShadow: '0 2px 24px rgba(218,165,32,0.25)',
          }}>
            Leituras para Viver Melhor
          </p>
        </div>
      </div>

    </div>
  )
}
