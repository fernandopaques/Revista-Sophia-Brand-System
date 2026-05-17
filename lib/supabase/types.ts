export type UserRole = 'admin' | 'staff' | 'gratuito'

export type AssetCategory =
  | 'logotipos'
  | 'imagens'
  | 'videos'
  | 'audios'
  | 'documentos'
  | 'tipografia'
  | 'cores'
  | 'outros'

export interface Profile {
  id: string
  name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Asset {
  id: string
  name: string
  category: AssetCategory
  storage_path: string
  size_bytes: number | null
  mime_type: string | null
  uploaded_by: string | null
  created_at: string
  updated_at: string
}

export interface BrandModule {
  id: number
  slug: string
  title: string
  wave: 'estrategia' | 'verbal' | 'visual'
  ord: number
  is_published: boolean
  created_at: string
}
