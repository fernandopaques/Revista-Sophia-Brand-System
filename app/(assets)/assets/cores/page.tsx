'use client'
import { useState } from 'react'
import { Palette } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #6B4E8F 0%, #7B4B8A 40%, #DAA520 80%, #B8860B 100%)'

const MOCK_ASSETS = [
  { name: 'paleta-primaria.ase',  type: 'ASE',  size: '12 KB',  date: '10 mai 2026' },
  { name: 'paleta-completa.pdf',  type: 'PDF',  size: '1.2 MB', date: '10 mai 2026' },
  { name: 'cores-et.css',         type: 'CSS',  size: '4 KB',   date: '14 mai 2026' },
  { name: 'tokens-cores.json',    type: 'JSON', size: '6 KB',   date: '14 mai 2026' },
]

export default function CoresPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Cores"
        subtitle="Paletas, tokens e especificações cromáticas da marca"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Paleta"
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 48px', color: 'rgba(10,15,27,0.3)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px' }}>Nenhum ativo ainda</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>Faça upload da primeira paleta</p>
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
              icon={<Palette size={40} color="#9B7EC8" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Paleta"
      />
    </div>
  )
}
