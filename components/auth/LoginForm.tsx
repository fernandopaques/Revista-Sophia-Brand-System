'use client'
import { useState, useTransition } from 'react'
import { login } from '@/lib/supabase/actions'

export function LoginForm() {
  const [error, setError]            = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const em = (formData.get('email') as string) ?? ''
    const pw = (formData.get('password') as string) ?? ''

    if (!em.trim()) {
      setError('Informe seu email.')
      return
    }
    if (!pw) {
      setError('Informe sua senha.')
      return
    }

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

      {/* Email */}
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="voce@exemplo.com"
          required
          autoComplete="email"
          style={inputStyle}
          onFocus={e  => (e.target as HTMLInputElement).style.borderColor = '#1B3A5F'}
          onBlur={e   => (e.target as HTMLInputElement).style.borderColor = 'rgba(10,15,27,0.18)'}
        />
      </div>

      {/* Senha */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
          <label style={labelStyle}>Senha</label>
        </div>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          style={inputStyle}
          onFocus={e  => (e.target as HTMLInputElement).style.borderColor = '#1B3A5F'}
          onBlur={e   => (e.target as HTMLInputElement).style.borderColor = 'rgba(10,15,27,0.18)'}
        />
      </div>

      {/* Erro */}
      {error && (
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '13px',
          color: '#8B2635',
          marginBottom: '16px',
          background: 'rgba(139,38,53,0.06)',
          border: '1px solid rgba(139,38,53,0.15)',
          borderRadius: '6px',
          padding: '8px 12px',
          margin: '0 0 16px',
        }}>
          {error}
        </p>
      )}

      {/* Botão */}
      <button
        type="submit"
        disabled={isPending}
        style={{
          width: '100%',
          height: '48px',
          background: isPending ? 'rgba(27,58,95,0.45)' : '#1B3A5F',
          border: 'none',
          borderRadius: '8px',
          color: '#E5DCC7',
          fontFamily: 'var(--font-ui)',
          fontSize: '15px',
          fontWeight: 600,
          cursor: isPending ? 'not-allowed' : 'pointer',
          transition: 'background 150ms ease',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={e => {
          const btn = e.currentTarget as HTMLButtonElement
          if (!btn.disabled) btn.style.background = '#254d7a'
        }}
        onMouseLeave={e => {
          const btn = e.currentTarget as HTMLButtonElement
          if (!btn.disabled) btn.style.background = '#1B3A5F'
        }}
      >
        {isPending ? 'Entrando…' : 'Entrar'}
      </button>

    </form>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ui)',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0A0F1B',
  marginBottom: '6px',
  letterSpacing: '0.01em',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '46px',
  background: '#fff',
  border: '1px solid rgba(10,15,27,0.18)',
  borderRadius: '8px',
  padding: '0 14px',
  fontFamily: 'var(--font-ui)',
  fontSize: '15px',
  color: '#0A0F1B',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 150ms ease',
}
