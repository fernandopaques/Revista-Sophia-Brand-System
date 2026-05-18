import { createClient } from '@/lib/supabase/server'
import { PublicShell } from '@/components/public/PublicShell'
import { SectionCapa } from '@/components/public/SectionCapa'
import { SectionPorQueSophia } from '@/components/public/SectionPorQueSophia'
import { SectionManifesto } from '@/components/public/SectionManifesto'
import { SectionOQueNosMove } from '@/components/public/SectionOQueNosMove'
import { SectionONome } from '@/components/public/SectionONome'
import { SectionEncerramento } from '@/components/public/SectionEncerramento'

export const metadata = {
  title: 'Revista Sophia — Brand Book',
  description:
    'Sophia — a sabedoria que se busca quando o mundo oferece atalhos. Brand book público da Revista Sophia, voz editorial da Sociedade Teosófica no Brasil.',
}

export default async function PublicBrandbookPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let role: 'admin' | 'staff' | 'gratuito' | null = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
    role = (profile?.role as typeof role) ?? null
  }

  return (
    <PublicShell isAuthenticated={!!user} role={role}>
      <SectionCapa />
      <SectionPorQueSophia />
      <SectionManifesto />
      <SectionOQueNosMove />
      <SectionONome />
      <SectionEncerramento isAuthenticated={!!user} role={role} />
    </PublicShell>
  )
}
