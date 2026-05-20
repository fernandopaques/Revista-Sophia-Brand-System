'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface AssetCardProps {
  name: string
  type: string
  size?: string
  date?: string
  preview?: string
  icon: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
}

export function AssetCard({ name, type, size, date, preview, icon, onClick, onDelete }: AssetCardProps) {
  const [hovered, setHovered] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)
  const clickable = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#F8F4E6',
        borderRadius: '12px',
        border: '1px solid rgba(27,58,95,0.1)',
        overflow: 'hidden',
        position: 'relative',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 6px 20px rgba(27,58,95,0.12)'
          : '0 1px 4px rgba(27,58,95,0.06)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      {/* Dog-ear corner */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 24px 24px 0',
          borderColor: `transparent rgba(218,165,32,0.3) transparent transparent`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Delete button — appears on hover */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          aria-label={`Excluir ${name}`}
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: deleteHovered ? 'rgba(185,28,28,0.95)' : 'rgba(10,15,27,0.6)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#F8F4E6',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 150ms ease, background 150ms ease',
            zIndex: 2,
          }}
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Preview area */}
      <div
        style={{
          height: '140px',
          background: preview
            ? 'repeating-conic-gradient(rgba(27,58,95,0.04) 0% 25%, transparent 0% 50%) 50% / 16px 16px'
            : 'rgba(27,58,95,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt={name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <span style={{ color: 'rgba(27,58,95,0.25)', display: 'flex' }}>
            <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </span>
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <p
          title={name}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0A0F1B',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            color: 'rgba(10,15,27,0.45)',
            marginTop: '4px',
            marginBottom: 0,
          }}
        >
          {type}{size ? ` · ${size}` : ''}
        </p>
        {date && (
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              color: 'rgba(10,15,27,0.35)',
              marginTop: '2px',
              marginBottom: 0,
            }}
          >
            {date}
          </p>
        )}
      </div>
    </div>
  )
}
