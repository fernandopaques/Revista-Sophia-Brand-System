'use client'
import { useState } from 'react'
import { FileText } from 'lucide-react'
import { AssetBanner }      from '@/components/assets/AssetBanner'
import { AssetToolbar }     from '@/components/assets/AssetToolbar'
import { AssetCard }        from '@/components/assets/AssetCard'
import { AssetUploadModal } from '@/components/assets/AssetUploadModal'

const GRADIENT = 'linear-gradient(135deg, #4A5F4A 0%, #2E5F88 50%, #1B3A5F 100%)'

const MOCK_ASSETS = [
  { name: 'manual-de-marca.pdf',      type: 'PDF',  size: '18 MB',  date: '10 mai 2026' },
  { name: 'guia-de-uso-logo.pdf',     type: 'PDF',  size: '4.2 MB', date: '11 mai 2026' },
  { name: 'briefing-estrategico.pdf', type: 'PDF',  size: '2.8 MB', date: '12 mai 2026' },
  { name: 'relatorio-anual.pdf',      type: 'PDF',  size: '6.1 MB', date: '13 mai 2026' },
  { name: 'contrato-editorial.docx',  type: 'DOCX', size: '380 KB', date: '14 mai 2026' },
]

export default function DocumentosPage() {
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)

  const filtered = MOCK_ASSETS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <AssetBanner
        title="Documentos"
        subtitle="PDFs, manuais, relatórios e arquivos institucionais"
        gradient={GRADIENT}
      />
      <AssetToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onUploadClick={() => setUploadOpen(true)}
        uploadLabel="Upload de Documento"
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
              icon={<FileText size={40} color="#4A5F4A" />}
            />
          ))}
        </div>
      )}

      <AssetUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        assetType="Documento"
      />
    </div>
  )
}
