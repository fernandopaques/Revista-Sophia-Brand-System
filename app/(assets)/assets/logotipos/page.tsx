'use client'
import { useState } from 'react'
import { Hexagon } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #1B3A5F 0%, #2a5080 40%, #704214 70%, #B8860B 100%)'

const MOCK_ASSETS = [
  { name: 'logo-et-principal.svg',  type: 'SVG', size: '48 KB',  date: '10 mai 2026' },
  { name: 'logo-et-horizontal.png', type: 'PNG', size: '2.1 MB', date: '10 mai 2026' },
  { name: 'logo-et-negativo.svg',   type: 'SVG', size: '52 KB',  date: '11 mai 2026' },
  { name: 'logo-et-favicon.ico',    type: 'ICO', size: '8 KB',   date: '12 mai 2026' },
  { name: 'logo-et-monocromo.eps',  type: 'EPS', size: '180 KB', date: '12 mai 2026' },
]

export default function LogotiposPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Logotipos"
        subtitle="Versões oficiais do logotipo da Revista Sophia"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Logo"
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 48px', color: 'rgba(10,15,27,0.3)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px' }}>Nenhum ativo ainda</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>Faça upload do primeiro logotipo</p>
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
              icon={<Hexagon size={40} color="#DAA520" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Logo"
      />
    </div>
  )
}
