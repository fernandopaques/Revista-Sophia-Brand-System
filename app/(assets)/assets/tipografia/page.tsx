'use client'
import { useState } from 'react'
import { Type } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #704214 0%, #8B6914 40%, #DAA520 80%, #E5DCC7 100%)'

const MOCK_ASSETS = [
  { name: 'eb-garamond-400.woff2', type: 'WOFF2', size: '88 KB',  date: '10 mai 2026' },
  { name: 'eb-garamond-700.woff2', type: 'WOFF2', size: '90 KB',  date: '10 mai 2026' },
  { name: 'source-sans-3.woff2',   type: 'WOFF2', size: '72 KB',  date: '10 mai 2026' },
  { name: 'guia-tipografico.pdf',  type: 'PDF',   size: '3.4 MB', date: '11 mai 2026' },
  { name: 'font-tokens.json',      type: 'JSON',  size: '3 KB',   date: '14 mai 2026' },
]

export default function TipografiaPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

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

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 48px', color: 'rgba(10,15,27,0.3)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: '0 0 8px' }}>Nenhum ativo ainda</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0 }}>Faça upload da primeira fonte</p>
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
              icon={<Type size={40} color="#C4956A" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Fonte"
      />
    </div>
  )
}
