'use client'

import { useRef, useState } from 'react'
import { X, UploadCloud } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { uploadAsset } from '@/lib/supabase/storage'
import type { Asset, AssetCategory } from '@/lib/supabase/types'

interface FileUploadState {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  error: string | null
}

interface AssetUploadModalProps {
  isOpen: boolean
  onClose: () => void
  assetType: string
  onUploadComplete?: (asset: Asset) => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const VALID_CATEGORIES: AssetCategory[] = [
  'logotipos', 'imagens', 'videos', 'audios',
  'documentos', 'tipografia', 'cores', 'outros',
]

function toAssetCategory(value: string): AssetCategory {
  const lower = value.toLowerCase() as AssetCategory
  return VALID_CATEGORIES.includes(lower) ? lower : 'outros'
}

export function AssetUploadModal({ isOpen, onClose, assetType, onUploadComplete }: AssetUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [closeHovered, setCloseHovered] = useState(false)
  const [dropHovered, setDropHovered] = useState(false)
  const [fileStates, setFileStates] = useState<FileUploadState[]>([])
  const [isUploading, setIsUploading] = useState(false)

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isUploading) {
      onClose()
    }
  }

  const handleDropAreaClick = () => {
    if (!isUploading) fileInputRef.current?.click()
  }

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const next: FileUploadState[] = Array.from(incoming).map(file => ({
      file,
      status: 'pending',
      error: null,
    }))
    setFileStates(prev => [...prev, ...next])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDropHovered(false)
    addFiles(e.dataTransfer.files)
  }

  const handleUpload = async () => {
    setIsUploading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id ?? ''
    const category = toAssetCategory(assetType)

    const uploadedAssets: Asset[] = []

    for (let i = 0; i < fileStates.length; i++) {
      if (fileStates[i].status !== 'pending') continue

      setFileStates(prev =>
        prev.map((fs, idx) => idx === i ? { ...fs, status: 'uploading' } : fs)
      )

      const { data, error } = await uploadAsset(fileStates[i].file, category, userId)

      if (error || !data) {
        setFileStates(prev =>
          prev.map((fs, idx) => idx === i ? { ...fs, status: 'error', error: error ?? 'Erro desconhecido' } : fs)
        )
      } else {
        setFileStates(prev =>
          prev.map((fs, idx) => idx === i ? { ...fs, status: 'done' } : fs)
        )
        uploadedAssets.push(data)
      }
    }

    setIsUploading(false)

    if (uploadedAssets.length > 0) {
      uploadedAssets.forEach(asset => onUploadComplete?.(asset))
      onClose()
    }
  }

  const hasPending = fileStates.some(fs => fs.status === 'pending')

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,15,27,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#F8F4E6',
          borderRadius: '16px',
          padding: '32px',
          width: '480px',
          maxWidth: 'calc(100vw - 32px)',
          border: '1px solid rgba(218,165,32,0.2)',
          boxShadow: '0 24px 64px rgba(10,15,27,0.25), 0 8px 24px rgba(10,15,27,0.12)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => { if (!isUploading) onClose() }}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          aria-label="Fechar modal"
          disabled={isUploading}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: closeHovered ? 'rgba(27,58,95,0.08)' : 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            color: 'rgba(10,15,27,0.5)',
            transition: 'background 150ms ease',
          }}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#1B3A5F',
            margin: '0 0 24px',
            lineHeight: 1.2,
          }}
        >
          Fazer Upload de {assetType}
        </h2>

        {/* Drop area */}
        <div
          onClick={handleDropAreaClick}
          onDragOver={e => { e.preventDefault(); setDropHovered(true) }}
          onDragLeave={() => setDropHovered(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dropHovered ? 'rgba(27,58,95,0.45)' : 'rgba(27,58,95,0.2)'}`,
            borderRadius: '12px',
            height: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: dropHovered ? 'rgba(27,58,95,0.06)' : 'rgba(27,58,95,0.03)',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            transition: 'border-color 150ms ease, background 150ms ease',
          }}
        >
          <UploadCloud size={32} color="rgba(27,58,95,0.3)" />
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              color: 'rgba(10,15,27,0.5)',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Arraste arquivos aqui ou clique para selecionar
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* File list */}
        {fileStates.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              margin: '16px 0 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {fileStates.map((fs, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  color: fs.status === 'error' ? '#b91c1c' : fs.status === 'done' ? '#15803d' : '#0A0F1B',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: fs.status === 'error'
                    ? 'rgba(185,28,28,0.06)'
                    : fs.status === 'done'
                    ? 'rgba(21,128,61,0.06)'
                    : fs.status === 'uploading'
                    ? 'rgba(27,58,95,0.06)'
                    : 'rgba(27,58,95,0.03)',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                  {fs.file.name} — {formatBytes(fs.file.size)}
                </span>
                <span style={{ flexShrink: 0, marginLeft: '8px', fontSize: '12px' }}>
                  {fs.status === 'uploading' && 'Enviando…'}
                  {fs.status === 'done' && 'Concluído'}
                  {fs.status === 'error' && (fs.error ?? 'Erro')}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Upload button */}
        {(hasPending || isUploading) && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            style={{
              marginTop: '16px',
              width: '100%',
              height: '48px',
              borderRadius: '8px',
              border: 'none',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              background: isUploading ? 'rgba(27,58,95,0.45)' : '#1B3A5F',
              color: '#E5DCC7',
              fontFamily: 'var(--font-ui)',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'background 150ms ease',
            }}
          >
            {isUploading ? 'Enviando…' : 'Fazer Upload'}
          </button>
        )}
      </div>
    </div>
  )
}
