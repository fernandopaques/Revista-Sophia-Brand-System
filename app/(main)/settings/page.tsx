import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SettingsPanel } from '@/components/settings/SettingsPanel'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="scroll-container" style={{ overflowY: 'auto', height: '100%' }}>
      <div className="et-settings-padding" style={{ maxWidth: '900px' }}>
        <SettingsPanel
          initialName={profile?.name ?? ''}
          email={user.email ?? ''}
        />
      </div>
    </div>
  )
}
