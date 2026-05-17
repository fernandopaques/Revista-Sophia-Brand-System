'use client'
import { useState } from 'react'
import { Music } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #6B4E8F 0%, #7B4B8A 50%, #1B3A5F 100%)'

const MOCK_ASSETS = [
  { name: 'trilha-institucional.mp3', type: 'MP3', size: '8.4 MB', date: '05 mai 2026' },
  { name: 'jingle-et.wav',            type: 'WAV', size: '22 MB',  date: '06 mai 2026' },
  { name: 'locucao-manifesto.mp3',    type: 'MP3', size: '4.1 MB', date: '07 mai 2026' },
]

export default function AudiosPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Áudios"
        subtitle="Trilhas, jingles e recursos sonoros da marca"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Áudio"
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
              icon={<Music size={40} color="#7B4B8A" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Áudio"
      />
    </div>
  )
}
