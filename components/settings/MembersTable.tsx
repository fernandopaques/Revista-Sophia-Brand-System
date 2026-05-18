'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {
  updateMemberRole,
  deleteMember,
  updateMemberName,
} from '@/lib/supabase/actions/members'
import type { Profile, UserRole } from '@/lib/supabase/types'

type Member = Profile & { email: string }

interface Toast {
  message: string
  type: 'success' | 'error'
}

const ROLE_BADGE: Record<UserRole, React.CSSProperties> = {
  admin: {
    background: 'rgba(218,165,32,0.12)',
    color: '#9B7300',
    border: '1px solid rgba(218,165,32,0.3)',
    borderRadius: 6,
    padding: '2px 10px',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'var(--font-ui)',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  staff: {
    background: 'rgba(27,58,95,0.08)',
    color: '#1B3A5F',
    border: '1px solid rgba(27,58,95,0.2)',
    borderRadius: 6,
    padding: '2px 10px',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'var(--font-ui)',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  gratuito: {
    background: 'rgba(10,15,27,0.05)',
    color: 'rgba(10,15,27,0.5)',
    border: '1px solid rgba(10,15,27,0.12)',
    borderRadius: 6,
    padding: '2px 10px',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'var(--font-ui)',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function MembersTable({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null)
    })
  }, [])

  const showToast = useCallback((message: string, type: Toast['type']) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  async function handleRoleChange(targetId: string, newRole: UserRole) {
    setLoadingId(targetId)
    const result = await updateMemberRole(targetId, newRole)
    if (result.error) {
      showToast(result.error, 'error')
    } else {
      setMembers(prev =>
        prev.map(m => m.id === targetId ? { ...m, role: newRole } : m)
      )
      showToast('Role atualizada com sucesso.', 'success')
    }
    setLoadingId(null)
  }

  async function handleDelete(targetId: string) {
    const confirmed = window.confirm('Tem certeza? Esta ação não pode ser desfeita.')
    if (!confirmed) return
    setLoadingId(targetId)
    const result = await deleteMember(targetId)
    if (result.error) {
      showToast(result.error, 'error')
    } else {
      setMembers(prev => prev.filter(m => m.id !== targetId))
      showToast('Membro removido com sucesso.', 'success')
    }
    setLoadingId(null)
  }

  function startEdit(member: Member) {
    setEditingId(member.id)
    setEditName(member.name ?? '')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
  }

  async function handleSaveName(targetId: string) {
    if (!editName.trim()) {
      showToast('O nome não pode ser vazio.', 'error')
      return
    }
    setLoadingId(targetId)
    const result = await updateMemberName(targetId, editName)
    if (result.error) {
      showToast(result.error, 'error')
    } else {
      setMembers(prev =>
        prev.map(m => m.id === targetId ? { ...m, name: editName.trim() } : m)
      )
      showToast('Nome atualizado com sucesso.', 'success')
      setEditingId(null)
    }
    setLoadingId(null)
  }

  const isSelf = (id: string) => id === currentUserId

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'var(--font-ui)',
          background: toast.type === 'success'
            ? 'rgba(34,197,94,0.1)'
            : 'rgba(139,38,53,0.08)',
          color: toast.type === 'success' ? '#166534' : '#8B2635',
          border: toast.type === 'success'
            ? '1px solid rgba(34,197,94,0.2)'
            : '1px solid rgba(139,38,53,0.15)',
          transition: 'opacity 200ms ease',
        }}>
          {toast.message}
        </div>
      )}

      {/* Table */}
      <div style={{
        background: '#fff',
        border: '1px solid rgba(10,15,27,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 1fr 1fr 1.5fr',
          background: '#F8F4E6',
          padding: '12px 24px',
          gap: '16px',
          minWidth: '620px',
        }}>
          {['Nome', 'Email', 'Role', 'Desde', 'Ações'].map(col => (
            <span key={col} style={{
              fontSize: '12px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(10,15,27,0.45)',
            }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {members.map((member, idx) => {
          const isLoading = loadingId === member.id
          const isEditing = editingId === member.id
          const self = isSelf(member.id)
          const isLast = idx === members.length - 1

          return (
            <div
              key={member.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 1fr 1.5fr',
                padding: '16px 24px',
                gap: '16px',
                alignItems: 'center',
                minWidth: '620px',
                borderBottom: isLast ? 'none' : '1px solid rgba(10,15,27,0.06)',
                background: isLoading ? 'rgba(27,58,95,0.02)' : 'transparent',
                opacity: isLoading ? 0.6 : 1,
                transition: 'background 150ms ease, opacity 150ms ease',
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(27,58,95,0.02)'
                }
              }}
              onMouseLeave={e => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.background = isLoading ? 'rgba(27,58,95,0.02)' : 'transparent'
                }
              }}
            >
              {/* Nome */}
              <div style={{ minWidth: 0 }}>
                {isEditing ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSaveName(member.id)
                        if (e.key === 'Escape') cancelEdit()
                      }}
                      autoFocus
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        color: '#0A0F1B',
                        border: '1px solid rgba(27,58,95,0.3)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        background: '#F8F4E6',
                        outline: 'none',
                        width: '100%',
                        minWidth: 0,
                      }}
                    />
                    <button
                      onClick={() => handleSaveName(member.id)}
                      title="Salvar"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: '#166534',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '28px',
                        minHeight: '28px',
                      }}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      title="Cancelar"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: '#8B2635',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '28px',
                        minHeight: '28px',
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0A0F1B',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}>
                    {member.name ?? '—'}
                    {self && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        color: 'rgba(10,15,27,0.4)',
                        marginLeft: '6px',
                      }}>
                        (você)
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Email */}
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'rgba(10,15,27,0.6)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
              }}>
                {member.email || '—'}
              </span>

              {/* Role badge */}
              <div>
                <span style={ROLE_BADGE[member.role]}>
                  {member.role}
                </span>
              </div>

              {/* Desde */}
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                color: 'rgba(10,15,27,0.45)',
                whiteSpace: 'nowrap',
              }}>
                {formatDate(member.created_at)}
              </span>

              {/* Ações */}
              <div>
                {!self ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                    {/* Role select */}
                    <select
                      value={member.role}
                      disabled={isLoading}
                      onChange={e => handleRoleChange(member.id, e.target.value as UserRole)}
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '13px',
                        color: '#1B3A5F',
                        background: '#F8F4E6',
                        border: '1px solid rgba(27,58,95,0.2)',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        cursor: 'pointer',
                        outline: 'none',
                        height: '32px',
                        minWidth: 0,
                      }}
                    >
                      <option value="admin">admin</option>
                      <option value="staff">staff</option>
                      <option value="gratuito">gratuito</option>
                    </select>

                    {/* Edit name button */}
                    <button
                      onClick={() => startEdit(member)}
                      disabled={isLoading || isEditing}
                      title="Editar nome"
                      style={{
                        background: 'none',
                        border: '1px solid rgba(27,58,95,0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '0',
                        color: '#1B3A5F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        flexShrink: 0,
                        opacity: isLoading ? 0.5 : 1,
                        transition: 'background 150ms ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(27,58,95,0.06)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'none'
                      }}
                    >
                      <Pencil size={13} />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(member.id)}
                      disabled={isLoading}
                      title="Excluir membro"
                      style={{
                        background: 'none',
                        border: '1px solid rgba(139,38,53,0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '0',
                        color: '#8B2635',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        flexShrink: 0,
                        opacity: isLoading ? 0.5 : 1,
                        transition: 'background 150ms ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(139,38,53,0.06)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'none'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ) : (
                  <span style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'rgba(10,15,27,0.3)',
                    fontStyle: 'italic',
                  }}>
                    —
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {members.length === 0 && (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'rgba(10,15,27,0.4)',
          }}>
            Nenhum membro encontrado.
          </div>
        )}
        </div>{/* /scroll wrapper */}
      </div>
    </div>
  )
}
