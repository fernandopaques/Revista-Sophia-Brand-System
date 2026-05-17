'use client'

import { Search, Upload } from 'lucide-react'
import { useState } from 'react'

interface AssetToolbarProps {
  searchValue: string
  onSearchChange: (v: string) => void
  onUploadClick: () => void
  uploadLabel?: string
}

export function AssetToolbar({
  searchValue,
  onSearchChange,
  onUploadClick,
  uploadLabel = 'Fazer Upload',
}: AssetToolbarProps) {
  const [uploadHovered, setUploadHovered] = useState(false)

  return (
    <div
      style={{
        padding: '24px 48px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      {/* Search wrapper */}
      <div style={{ position: 'relative', flex: 1 }}>
        <span
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            color: 'rgba(27,58,95,0.4)',
            pointerEvents: 'none',
          }}
        >
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Buscar ativos…"
          style={{
            display: 'block',
            width: '100%',
            height: '44px',
            background: '#ffffff',
            border: '1px solid rgba(27,58,95,0.15)',
            borderRadius: '8px',
            padding: '0 14px 0 40px',
            fontSize: '15px',
            fontFamily: 'var(--font-ui)',
            color: '#0A0F1B',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Upload button */}
      <button
        onClick={onUploadClick}
        onMouseEnter={() => setUploadHovered(true)}
        onMouseLeave={() => setUploadHovered(false)}
        style={{
          height: '44px',
          padding: '0 24px',
          background: uploadHovered ? '#254d7a' : '#1B3A5F',
          color: '#E5DCC7',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'var(--font-ui)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
          transition: 'background 150ms ease',
        }}
      >
        <Upload size={16} />
        {uploadLabel}
      </button>
    </div>
  )
}
