'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email    = (formData.get('email') as string) ?? ''
  const password = (formData.get('password') as string) ?? ''

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { error: 'Confirme seu email antes de entrar. Verifique sua caixa de entrada.' }
    }
    if (error.message.toLowerCase().includes('invalid login')) {
      return { error: 'Email ou senha incorretos.' }
    }
    return { error: 'Email ou senha incorretos.' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email    = (formData.get('email') as string) ?? ''
  const password = (formData.get('password') as string) ?? ''
  const name     = (formData.get('name') as string) ?? ''

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered')) {
      return { error: 'Este email já está cadastrado. Tente entrar.' }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Conta criada! Verifique seu email para confirmar o cadastro e depois faça login.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
