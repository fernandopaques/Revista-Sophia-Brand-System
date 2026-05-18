'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Settings, LogOut, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UserInfo {
  name: string
  email: string
  plan: string
  isAdmin: boolean
}

function UserAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initial = (name || '?').charAt(0).toUpperCase()
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1B3A5F 0%, #2a5080 100%)',
        border: '2px solid rgba(218,165,32,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-ui)',
        fontWeight: 700,
        fontSize: size * 0.38,
        color: '#DAA520',
        letterSpacing: '0.02em',
      }}
    >
      {initial}
    </div>
  )
}

export function SidebarFooter() {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [user, setUser] = useState<UserInfo>({ name: '…', email: '', plan: 'Gratuito', isAdmin: false })
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) return
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', data.user.id)
      .single()

    setUser({
      name: profile?.name || data.user.email?.split('@')[0] || 'Usuário',
      email: data.user.email || '',
      plan: profile?.role === 'admin' ? 'Admin' : profile?.role === 'staff' ? 'Staff' : 'Gratuito',
      isAdmin: profile?.role === 'admin',
    })
  }, [])

  // Load real user data
  useEffect(() => { fetchUser() }, [fetchUser])

  // Refresh when profile is saved from settings
  useEffect(() => {
    window.addEventListener('profile-updated', fetchUser)
    return () => window.removeEventListener('profile-updated', fetchUser)
  }, [fetchUser])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleLogout = useCallback(async () => {
    setLoggingOut(true)
    setOpen(false)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }, [router])

  const menuItemStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(229,220,199,0.85)',
    fontSize: '14px',
    fontFamily: 'var(--font-ui)',
    transition: 'background 150ms ease, color 150ms ease',
    textDecoration: 'none',
  }

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>

      {/* Popover menu */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '12px',
          right: '12px',
          background: '#1a2d47',
          border: '1px solid rgba(218,165,32,0.25)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          transformOrigin: 'bottom center',
          transform: open ? 'scaleY(1) translateY(0)' : 'scaleY(0.85) translateY(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 180ms ease',
        }}
      >
        {/* User info */}
        <div style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(218,165,32,0.15)',
        }}>
          <UserAvatar name={user.name} size={36} />
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#E5DCC7', fontSize: '14px', fontFamily: 'var(--font-ui)', fontWeight: 500, lineHeight: 1.3 }}>
              {user.name}
            </p>
            {user.email && (
              <p style={{ color: 'rgba(229,220,199,0.4)', fontSize: '11px', fontFamily: 'var(--font-ui)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Usuários — apenas admin */}
        {user.isAdmin && (
          <Link
            href="/admin/usuarios"
            onClick={() => setOpen(false)}
            style={{ ...menuItemStyle }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(218,165,32,0.08)'; el.style.color = '#E5DCC7' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(229,220,199,0.85)' }}
          >
            <Users size={16} style={{ flexShrink: 0, color: 'rgba(218,165,32,0.7)' }} />
            Usuários
          </Link>
        )}

        {/* Configurações */}
        <Link
          href="/settings"
          onClick={() => setOpen(false)}
          style={{ ...menuItemStyle, borderBottom: '1px solid rgba(218,165,32,0.10)' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(218,165,32,0.08)'; el.style.color = '#E5DCC7' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(229,220,199,0.85)' }}
        >
          <Settings size={16} style={{ flexShrink: 0, color: 'rgba(218,165,32,0.7)' }} />
          Configurações
        </Link>

        {/* Desconectar */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{ ...menuItemStyle, opacity: loggingOut ? 0.6 : 1 }}
          onMouseEnter={e => { if (!loggingOut) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(139,38,53,0.15)'; el.style.color = '#f87171' } }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = 'rgba(229,220,199,0.85)' }}
        >
          <LogOut size={16} style={{ flexShrink: 0, color: loggingOut ? 'rgba(218,165,32,0.4)' : 'rgba(218,165,32,0.7)' }} />
          {loggingOut ? 'Desconectando…' : 'Desconectar'}
        </button>

        {/* Plan badge */}
        <div style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderTop: '1px solid rgba(218,165,32,0.15)',
        }}>
          <UserAvatar name={user.name} size={28} />
          <div>
            <p style={{ color: '#E5DCC7', fontSize: '12px', fontFamily: 'var(--font-ui)', fontWeight: 500, lineHeight: 1.3 }}>
              {user.name}
            </p>
            <p style={{ color: 'rgba(229,220,199,0.4)', fontSize: '11px', fontFamily: 'var(--font-ui)' }}>
              {user.plan}
            </p>
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '16px 20px',
          background: open ? 'rgba(218,165,32,0.08)' : 'transparent',
          border: 'none',
          borderTop: '2px solid rgba(218,165,32,0.3)',
          cursor: 'pointer',
          transition: 'background 150ms ease',
          textAlign: 'left',
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(218,165,32,0.06)' }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <UserAvatar name={user.name} size={40} />
        <div style={{ minWidth: 0 }}>
          <p style={{
            color: '#E5DCC7',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {user.name}
          </p>
          <p style={{ color: 'rgba(229,220,199,0.45)', fontSize: '12px', fontFamily: 'var(--font-ui)' }}>
            {user.plan}
          </p>
        </div>
      </button>
    </div>
  )
}
