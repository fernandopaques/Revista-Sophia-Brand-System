'use client'

import { Download } from 'lucide-react'

interface AssetDownloadProps {
  /** Texto descritivo do arquivo, e.g. "Logo ET — PNG" */
  label: string
  /** Caminho/nome do arquivo para download futuro */
  file: string
  /** Formato do arquivo, e.g. "PNG", "SVG", "ZIP" */
  format?: string
  /** Tamanho do arquivo, e.g. "2.4 MB" */
  size?: string
}

export function AssetDownload({
  label,
  file: _file, // usado na Fase 2 — Supabase Storage
  format = 'PNG',
  size,
}: AssetDownloadProps) {
  // Fase 2: substituir por download autenticado via Supabase Storage
  // const { data } = await supabase.storage.from('assets').download(_file)
  const handleClick = () => {
    // TODO Fase 2: implementar download real
    console.info('[AssetDownload] Download disponível na Fase 2 (Supabase Storage).')
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      title="Download disponível na Fase 2 (Supabase Storage)"
      aria-label={`Baixar ${label} — disponível na Fase 2`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        background: '#F5F1E8',
        border: '1px solid rgba(218,165,32,0.2)',
        borderRadius: '8px',
        margin: '8px 0',
        cursor: 'not-allowed',
        opacity: 0.85,
        userSelect: 'none',
      }}
    >
      <Download size={18} color="#DAA520" aria-hidden="true" />
      <div>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#0A0F1B',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            color: 'rgba(10,15,27,0.45)',
            margin: 0,
            marginTop: '2px',
          }}
        >
          {format}
          {size ? ` · ${size}` : ''} · Disponível na Fase 2
        </p>
      </div>
    </div>
  )
}
