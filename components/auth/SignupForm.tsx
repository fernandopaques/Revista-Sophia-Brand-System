'use client'
import { useState, useTransition } from 'react'
import { signup } from '@/lib/supabase/actions'

export function SignupForm() {
  const [error, setError]            = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const pw  = (formData.get('password') as string) ?? ''
    const cpw = (formData.get('confirmPassword') as string) ?? ''
    const nm  = (formData.get('name') as string) ?? ''
    const em  = (formData.get('email') as string) ?? ''

    if (!nm.trim()) {
      setError('Informe seu nome completo.')
      return
    }
    if (!em.trim()) {
      setError('Informe seu email.')
      return
    }
    if (pw.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      return
    }
    if (pw !== cpw) {
      setError('As senhas não coincidem.')
      return
    }

    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

      {/* Nome completo */}
      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Nome completo</label>
        <input
          type="text"
          name="name"
          placeholder="Seu nome completo"
          required
          autoComplete="name"
          style={inputStyle}
          onFocus={e  => (e.target as HTMLInputElement).style.borderColor = '#1B3A5F'}
          onBlur={e   => (e.target as HTMLInputElement).style.borderColor = 'rgba(10,15,27,0.18)'}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: '16px' }}>
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
      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>Senha</label>
        <input
          type="password"
          name="password"
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
          autoComplete="new-password"
          style={inputStyle}
          onFocus={e  => (e.target as HTMLInputElement).style.borderColor = '#1B3A5F'}
          onBlur={e   => (e.target as HTMLInputElement).style.borderColor = 'rgba(10,15,27,0.18)'}
        />
      </div>

      {/* Confirmar senha */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>Confirmar senha</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repita a senha"
          required
          autoComplete="new-password"
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
        {isPending ? 'Criando conta…' : 'Criar conta'}
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
  height: '44px',
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
