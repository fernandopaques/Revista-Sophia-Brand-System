'use client'
import { useState } from 'react'
import { Video } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #0A0F1B 0%, #1B3A5F 50%, #2E5F88 100%)'

const MOCK_ASSETS = [
  { name: 'apresentacao-et-2026.mp4', type: 'MP4', size: '84 MB',  date: '08 mai 2026' },
  { name: 'motion-logo-ouro.mov',     type: 'MOV', size: '12 MB',  date: '09 mai 2026' },
  { name: 'reel-editorial.mp4',       type: 'MP4', size: '47 MB',  date: '10 mai 2026' },
]

export default function VideosPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Vídeos"
        subtitle="Vídeos institucionais, motions e animações da marca"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Vídeo"
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 48px', color: 'rgba(10,15,27,0.3)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px' }}>Nenhum ativo ainda</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>Faça upload do primeiro ativo</p>
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
              key={asset.name}
              name={asset.name}
              type={asset.type}
              size={asset.size}
              date={asset.date}
              icon={<Video size={40} color="#2E5F88" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Vídeo"
      />
    </div>
  )
}
