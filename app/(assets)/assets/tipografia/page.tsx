'use client'
import { useState, useEffect, useCallback } from 'react'
import { Type, UploadCloud } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'
import { listAssetsByCategory, getSignedUrl, deleteAsset } from '@/lib/supabase/storage'
import type { Asset } from '@/lib/supabase/types'

const GRADIENT = 'linear-gradient(135deg, #704214 0%, #8B6914 40%, #DAA520 80%, #E5DCC7 100%)'

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fileExtension(path: string): string {
  return path.split('.').pop()?.toUpperCase() ?? '—'
}

function isImage(mime: string | null): boolean {
  return !!mime && mime.startsWith('image/')
}

export default function TipografiaPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadPreviews = useCallback(async (items: Asset[]) => {
    const entries = await Promise.all(
      items
        .filter(a => isImage(a.mime_type))
        .map(async (a) => {
          const url = await getSignedUrl(a.storage_path)
          return [a.id, url] as const
        })
    )
    const map: Record<string, string> = {}
    for (const [id, url] of entries) if (url) map[id] = url
    setPreviews(map)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    listAssetsByCategory('tipografia').then(items => {
      if (cancelled) return
      setAssets(items)
      setLoading(false)
      loadPreviews(items)
    })
    return () => { cancelled = true }
  }, [loadPreviews])

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleUploadComplete = async (asset: Asset) => {
    setAssets(prev => [asset, ...prev])
    if (isImage(asset.mime_type)) {
      const url = await getSignedUrl(asset.storage_path)
      if (url) setPreviews(prev => ({ ...prev, [asset.id]: url }))
    }
  }

  const handleOpen = (asset: Asset) => {
    const url = previews[asset.id]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    getSignedUrl(asset.storage_path).then(signed => {
      if (signed) window.open(signed, '_blank', 'noopener,noreferrer')
    })
  }

  const handleDelete = async (asset: Asset) => {
    const ok = window.confirm(`Excluir "${asset.name}"? Esta ação não pode ser desfeita.`)
    if (!ok) return
    const { error } = await deleteAsset(asset.id, asset.storage_path)
    if (error) {
      alert(`Erro ao excluir: ${error}`)
      return
    }
    setAssets(prev => prev.filter(a => a.id !== asset.id))
    setPreviews(prev => {
      const next = { ...prev }
      delete next[asset.id]
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Tipografia"
        subtitle="Fontes, arquivos e especificações tipográficas"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Fonte"
      />

      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
          padding: '0 48px 48px',
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: '#F8F4E6',
                borderRadius: '12px',
                border: '1px solid rgba(27,58,95,0.08)',
                height: '220px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                height: '140px',
                background: 'linear-gradient(90deg, rgba(27,58,95,0.04) 0%, rgba(27,58,95,0.08) 50%, rgba(27,58,95,0.04) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.6s ease-in-out infinite',
              }} />
              <div style={{ padding: '14px 16px' }}>
                <div style={{ height: '12px', width: '70%', background: 'rgba(27,58,95,0.08)', borderRadius: '4px' }} />
                <div style={{ height: '10px', width: '40%', background: 'rgba(27,58,95,0.06)', borderRadius: '4px', marginTop: '8px' }} />
              </div>
            </div>
          ))}
          <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 48px',
          color: 'rgba(10,15,27,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(27,58,95,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <UploadCloud size={28} color="rgba(27,58,95,0.35)" />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', margin: '0 0 6px', color: '#1B3A5F' }}>
              {search ? 'Nenhum resultado' : 'Nenhuma fonte ainda'}
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>
              {search
                ? `Não encontramos arquivos para "${search}".`
                : 'Faça o upload da primeira fonte para começar.'}
            </p>
          </div>
          {!search && (
            <button
              onClick={() => setUploadOpen(true)}
              style={{
                marginTop: '8px',
                padding: '10px 20px',
                background: '#1B3A5F',
                color: '#E5DCC7',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Upload de Fonte
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
          padding: '0 48px 48px',
        }}>
          {filtered.map(asset => (
            <AssetCard
              key={asset.id}
              name={asset.name}
              type={fileExtension(asset.storage_path)}
              size={formatBytes(asset.size_bytes)}
              date={formatDate(asset.created_at)}
              preview={previews[asset.id]}
              icon={<Type size={40} color="#C4956A" />}
              onClick={() => handleOpen(asset)}
              onDelete={() => handleDelete(asset)}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="tipografia"
        onUploadComplete={handleUploadComplete}
      />
    </div>
  )
}
