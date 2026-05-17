import Image from 'next/image'
import { SignupForm } from '@/components/auth/SignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar conta — Brand System Editora Teosófica',
}

export default function SignupPage() {
  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>

      {/* Painel esquerdo — azul profundo decorativo */}
      <div style={{
        width: '72px',
        flexShrink: 0,
        background: '#1B3A5F',
        borderRight: '1px solid rgba(218,165,32,0.18)',
        display: 'flex',
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

      {/* Painel central — formulário (scroll invisível se necessário) */}
      <div style={{
        flex: '0 0 560px',
        background: '#F8F4E6',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Conteúdo com padding interno */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 64px',
          minHeight: 'min-content',
        }}>
          {/* Marca */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '16px',
                fontWeight: 400,
                color: '#1B3A5F',
                letterSpacing: '0.04em',
              }}>
                Editora Teosófica
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
              Criar conta
            </h1>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              color: 'rgba(10,15,27,0.5)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              Junte-se ao sistema de marca da Editora Teosófica.
            </p>
          </div>

          {/* Formulário */}
          <SignupForm />

          {/* Rodapé */}
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'rgba(10,15,27,0.45)',
            marginTop: '20px',
            textAlign: 'center',
          }}>
            Já tenho uma conta.{' '}
            <a
              href="/login"
              style={{
                color: '#1B3A5F',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(27,58,95,0.3)',
                paddingBottom: '1px',
              }}
            >
              Entrar
            </a>
          </p>
        </div>
      </div>

      {/* Painel direito — gradiente ET */}
      <div style={{
        flex: 1,
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
            alt="Editora Teosófica"
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
