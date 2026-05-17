import { createClient } from '@/lib/supabase/client'
import type { Asset, AssetCategory } from '@/lib/supabase/types'

const BUCKET = 'brand-assets'

export async function uploadAsset(
  file: File,
  category: AssetCategory,
  userId: string
): Promise<{ data: Asset | null; error: string | null }> {
  const supabase = createClient()
  const path = `${category}/${crypto.randomUUID()}-${file.name}`

  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file)

  if (storageError) {
    return { data: null, error: storageError.message }
  }

  const { data, error: dbError } = await supabase
    .from('assets')
    .insert({
      name: file.name,
      category,
      storage_path: path,
      size_bytes: file.size,
      mime_type: file.type,
      uploaded_by: userId,
    })
    .select()
    .single()

  if (dbError) {
    return { data: null, error: dbError.message }
  }

  return { data: data as Asset, error: null }
}

export async function listAssetsByCategory(
  category: AssetCategory
): Promise<Asset[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data as Asset[]
}

export async function getSignedUrl(
  storagePath: string
): Promise<string | null> {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, 3600)

  if (error || !data) return null

  return data.signedUrl
}

export async function deleteAsset(
  assetId: string,
  storagePath: string
): Promise<{ error: string | null }> {
  const supabase = createClient()

  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([storagePath])

  if (storageError) {
    return { error: storageError.message }
  }

  const { error: dbError } = await supabase
    .from('assets')
    .delete()
    .eq('id', assetId)

  if (dbError) {
    return { error: dbError.message }
  }

  return { error: null }
}
