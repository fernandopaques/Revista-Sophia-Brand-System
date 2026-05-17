'use client'
import { useState } from 'react'
import { Image } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #1B3A5F 0%, #2E5F88 50%, #4A5F4A 100%)'

const MOCK_ASSETS = [
  { name: 'foto-sede-st.jpg',        type: 'JPG', size: '4.2 MB', date: '12 mai 2026' },
  { name: 'banner-editorial.png',    type: 'PNG', size: '2.8 MB', date: '13 mai 2026' },
  { name: 'textura-papiro.jpg',      type: 'JPG', size: '1.6 MB', date: '13 mai 2026' },
  { name: 'simbolo-teosofico.png',   type: 'PNG', size: '380 KB', date: '14 mai 2026' },
  { name: 'foto-biblioteca.jpg',     type: 'JPG', size: '5.1 MB', date: '15 mai 2026' },
  { name: 'moodboard-editorial.jpg', type: 'JPG', size: '3.9 MB', date: '15 mai 2026' },
]

export default function ImagensPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Imagens"
        subtitle="Fotografias, ilustrações e elementos visuais"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Imagem"
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 48px', color: 'rgba(10,15,27,0.3)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px' }}>Nenhum ativo ainda</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>Faça upload da primeira imagem</p>
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
              icon={<Image size={40} color="#2E5F88" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Imagem"
      />
    </div>
  )
}
