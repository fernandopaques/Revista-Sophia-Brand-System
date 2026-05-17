'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { Profile, UserRole } from '@/lib/supabase/types'

async function requireAdmin(): Promise<{ userId: string } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'Sem permissão' }
  return { userId: user.id }
}

export async function listMembers(): Promise<(Profile & { email: string })[]> {
  const check = await requireAdmin()
  if ('error' in check) return []

  const serviceClient = createServiceClient()

  const { data: usersData } = await serviceClient.auth.admin.listUsers()
  const authUsers = usersData?.users ?? []

  const { data: profiles } = await serviceClient
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })

  if (!profiles) return []

  const emailMap = new Map<string, string>(
    authUsers.map(u => [u.id, u.email ?? ''])
  )

  return profiles.map((p: Profile) => ({
    ...p,
    email: emailMap.get(p.id) ?? '',
  }))
}

export async function updateMemberRole(
  targetUserId: string,
  newRole: UserRole
): Promise<{ error?: string }> {
  const check = await requireAdmin()
  if ('error' in check) return { error: check.error }

  if (targetUserId === check.userId) {
    return { error: 'Não é possível alterar sua própria role' }
  }

  const serviceClient = createServiceClient()
  const { error } = await serviceClient
    .from('profiles')
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq('id', targetUserId)

  if (error) return { error: error.message }

  revalidatePath('/settings')
  return {}
}

export async function deleteMember(
  targetUserId: string
): Promise<{ error?: string }> {
  const check = await requireAdmin()
  if ('error' in check) return { error: check.error }

  if (targetUserId === check.userId) {
    return { error: 'Não é possível excluir sua própria conta' }
  }

  const serviceClient = createServiceClient()
  const { error } = await serviceClient.auth.admin.deleteUser(targetUserId)

  if (error) return { error: error.message }

  revalidatePath('/settings')
  return {}
}

export async function updateMemberName(
  targetUserId: string,
  name: string
): Promise<{ error?: string }> {
  const check = await requireAdmin()
  if ('error' in check) return { error: check.error }

  const serviceClient = createServiceClient()
  const { error } = await serviceClient
    .from('profiles')
    .update({ name: name.trim(), updated_at: new Date().toISOString() })
    .eq('id', targetUserId)

  if (error) return { error: error.message }

  revalidatePath('/settings')
  return {}
}
