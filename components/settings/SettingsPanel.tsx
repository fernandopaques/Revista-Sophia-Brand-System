'use client'
import { useState, useCallback } from 'react'
import { User, Lock, Grid3x3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Tab = 'conta' | 'seguranca' | 'aplicativos'

interface Props {
  initialName: string
  email: string
}

// ── Shared field styles ──────────────────────────────────────────────────────

const fieldLabel: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '13px',
  fontWeight: 600,
  color: '#1B3A5F',
  marginBottom: '8px',
  display: 'block',
}

const fieldInput: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  fontFamily: 'var(--font-ui)',
  fontSize: '15px',
  color: '#0A0F1B',
  background: '#fff',
  border: '1.5px solid rgba(27,58,95,0.15)',
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 150ms ease',
}

const fieldInputReadonly: React.CSSProperties = {
  ...fieldInput,
  color: 'rgba(10,15,27,0.45)',
  background: '#F8F4E6',
  cursor: 'default',
}

// ── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div style={{
      padding: '11px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'var(--font-ui)',
      background: type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(139,38,53,0.07)',
      color: type === 'success' ? '#166534' : '#8B2635',
      border: type === 'success' ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(139,38,53,0.15)',
      marginBottom: '20px',
    }}>
      {message}
    </div>
  )
}

// ── Save button ──────────────────────────────────────────────────────────────

function SaveButton({ label, loading, onClick }: { label: string; loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: '11px 28px',
        background: loading ? 'rgba(27,58,95,0.5)' : '#1B3A5F',
        color: '#E5DCC7',
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'var(--font-ui)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 150ms ease',
      }}
      onMouseEnter={e => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#0f2540'
      }}
      onMouseLeave={e => {
        if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#1B3A5F'
      }}
    >
      {loading ? 'Aguarde…' : label}
    </button>
  )
}

// ── Conta tab ────────────────────────────────────────────────────────────────

function ContaTab({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName]     = useState(initialName)
  const [loading, setLoading] = useState(false)
  const [toast, setToast]   = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      showToast('O nome não pode ficar vazio.', 'error')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { showToast('Sessão expirada. Faça login novamente.', 'error'); setLoading(false); return }

    const { error } = await supabase
      .from('profiles')
      .update({ name: name.trim() })
      .eq('id', user.id)

    if (error) {
      showToast('Erro ao salvar. Tente novamente.', 'error')
    } else {
      showToast('Nome atualizado com sucesso.', 'success')
    }
    setLoading(false)
  }, [name])

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: '#1B3A5F', marginBottom: '6px' }}>
        Conta
      </h2>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'rgba(10,15,27,0.45)', marginBottom: '32px' }}>
        Gerencie suas informações pessoais
      </p>

      {toast && <Toast {...toast} />}

      <div style={{ marginBottom: '20px' }}>
        <label style={fieldLabel}>Nome</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          style={fieldInput}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.5)' }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.15)' }}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={fieldLabel}>Email</label>
        <input
          type="email"
          value={email}
          readOnly
          style={fieldInputReadonly}
        />
      </div>

      <SaveButton label="Salvar" loading={loading} onClick={handleSave} />
    </div>
  )
}

// ── Segurança tab ────────────────────────────────────────────────────────────

function SegurancaTab() {
  const [newPassword, setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]             = useState(false)
  const [toast, setToast]                 = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleUpdate = useCallback(async () => {
    if (newPassword.length < 6) {
      showToast('A senha deve ter pelo menos 6 caracteres.', 'error')
      return
    }
    if (newPassword !== confirmPassword) {
      showToast('As senhas não coincidem.', 'error')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      showToast(error.message || 'Erro ao atualizar senha.', 'error')
    } else {
      showToast('Senha atualizada com sucesso.', 'success')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }, [newPassword, confirmPassword])

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: '#1B3A5F', marginBottom: '6px' }}>
        Segurança
      </h2>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'rgba(10,15,27,0.45)', marginBottom: '32px' }}>
        Atualize sua senha de acesso
      </p>

      {toast && <Toast {...toast} />}

      <div style={{ marginBottom: '20px' }}>
        <label style={fieldLabel}>Nova senha</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="••••••••"
          style={fieldInput}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.5)' }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.15)' }}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <label style={fieldLabel}>Confirmar nova senha</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          onKeyDown={e => { if (e.key === 'Enter') handleUpdate() }}
          style={fieldInput}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.5)' }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(27,58,95,0.15)' }}
        />
      </div>

      <SaveButton label="Atualizar senha" loading={loading} onClick={handleUpdate} />
    </div>
  )
}

// ── Aplicativos tab ──────────────────────────────────────────────────────────

function AplicativosTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: '#1B3A5F', marginBottom: '6px' }}>
        Aplicativos
      </h2>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'rgba(10,15,27,0.45)', marginBottom: '48px' }}>
        Integrações e aplicativos conectados
      </p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'rgba(10,15,27,0.35)', fontStyle: 'italic' }}>
        Nenhum aplicativo conectado ainda.
      </p>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Tab; label: string; Icon: typeof User }[] = [
  { id: 'conta',       label: 'Conta',       Icon: User     },
  { id: 'seguranca',   label: 'Segurança',   Icon: Lock     },
  { id: 'aplicativos', label: 'Aplicativos', Icon: Grid3x3  },
]

export function SettingsPanel({ initialName, email }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('conta')

  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      border: '1px solid rgba(27,58,95,0.10)',
      borderRadius: '16px',
      overflow: 'hidden',
      minHeight: '500px',
      boxShadow: '0 2px 16px rgba(27,58,95,0.06)',
    }}>
      {/* Left sidebar */}
      <div style={{
        width: '200px',
        flexShrink: 0,
        borderRight: '1px solid rgba(27,58,95,0.08)',
        padding: '24px 12px',
        background: '#F8F4E6',
      }}>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(10,15,27,0.35)',
          padding: '0 12px',
          marginBottom: '12px',
        }}>
          Configurações
        </p>

        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                borderRadius: '8px',
                background: isActive ? '#1B3A5F' : 'transparent',
                color: isActive ? '#E5DCC7' : 'rgba(10,15,27,0.55)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease',
                marginBottom: '2px',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(27,58,95,0.07)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#1B3A5F'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(10,15,27,0.55)'
                }
              }}
            >
              <Icon size={15} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
              {label}
            </button>
          )
        })}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: '36px 40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {activeTab === 'conta'       && <ContaTab initialName={initialName} email={email} />}
          {activeTab === 'seguranca'   && <SegurancaTab />}
          {activeTab === 'aplicativos' && <AplicativosTab />}
        </div>
      </div>
    </div>
  )
}
