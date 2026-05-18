import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { listMembers } from '@/lib/supabase/actions/members'
import { MembersTable } from '@/components/settings/MembersTable'
import { Users } from 'lucide-react'

export const metadata = { title: 'Usuários — Revista Sophia' }

export default async function UsuariosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/acesso-restrito')

  const rawMembers = await listMembers()
  const members = [...rawMembers].sort((a, b) =>
    (a.name ?? a.email ?? '').localeCompare(b.name ?? b.email ?? '', 'pt-BR')
  )

  return (
    <div style={{
      overflowY: 'auto',
      height: '100%',
      scrollbarWidth: 'none',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(24px, 5vw, 56px) clamp(16px, 4vw, 40px)',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '8px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(27,58,95,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Users size={20} color="#1B3A5F" />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 700,
              color: '#1B3A5F',
              lineHeight: 1.2,
            }}>
              Usuários
            </h1>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              color: 'rgba(10,15,27,0.45)',
              marginTop: '2px',
            }}>
              {members.length} {members.length === 1 ? 'membro cadastrado' : 'membros cadastrados'} · ordenados por nome
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(27,58,95,0.08)',
          margin: '24px 0 28px',
        }} />

        {/* Role legend */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}>
          {[
            { role: 'admin',    label: 'Admin',    desc: 'Acesso total',          color: '#9B7300',             bg: 'rgba(218,165,32,0.10)',   border: 'rgba(218,165,32,0.3)' },
            { role: 'staff',    label: 'Staff',    desc: 'Edita e envia arquivos', color: '#1B3A5F',             bg: 'rgba(27,58,95,0.08)',     border: 'rgba(27,58,95,0.2)'  },
            { role: 'gratuito', label: 'Gratuito', desc: 'Só visualiza',           color: 'rgba(10,15,27,0.5)', bg: 'rgba(10,15,27,0.04)',    border: 'rgba(10,15,27,0.12)' },
          ].map(({ role, label, desc, color, bg, border }) => (
            <div key={role} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: '8px',
            }}>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                fontWeight: 700,
                color,
                textTransform: 'capitalize',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                color: 'rgba(10,15,27,0.4)',
              }}>
                — {desc}
              </span>
            </div>
          ))}
        </div>

        {/* Table */}
        <MembersTable initialMembers={members} />

      </div>
    </div>
  )
}
