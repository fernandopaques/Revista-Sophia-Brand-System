import Link from 'next/link'
import { Lock } from 'lucide-react'
import { logout } from '@/lib/supabase/actions'

export const metadata = { title: 'Acesso restrito — Revista Sophia' }

export default function AcessoRestritoPage() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: '#F8F4E6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          aria-hidden
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(218,165,32,0.10)',
            border: '1px solid rgba(218,165,32,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={28} color="#DAA520" strokeWidth={1.6} />
        </div>

        <div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700,
              color: '#1B3A5F',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            Área restrita
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-subheading)',
              fontSize: '17px',
              fontStyle: 'italic',
              color: '#DAA520',
              lineHeight: 1.5,
              marginBottom: '18px',
            }}
          >
            Esta seção exige permissão de equipe.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '15px',
              color: 'rgba(10,15,27,0.6)',
              lineHeight: 1.7,
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            Você está autenticado, mas seu perfil ainda não tem o nível de acesso
            necessário. Fale com um administrador da Revista Sophia para liberar.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '8px',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '44px',
              padding: '0 22px',
              background: '#1B3A5F',
              color: '#E5DCC7',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '8px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Voltar ao dashboard
          </Link>

          <form action={logout}>
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '44px',
                padding: '0 22px',
                background: 'transparent',
                color: '#1B3A5F',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: 500,
                border: '1px solid rgba(27,58,95,0.25)',
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Sair da conta
            </button>
          </form>
        </div>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            color: 'rgba(10,15,27,0.45)',
            textDecoration: 'none',
            marginTop: '8px',
          }}
        >
          ou voltar ao brand book público →
        </Link>
      </div>
    </main>
  )
}
