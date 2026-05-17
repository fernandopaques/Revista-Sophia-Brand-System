'use client'

import { useState } from 'react'

interface AssetCardProps {
  name: string
  type: string
  size?: string
  date?: string
  preview?: string
  icon: React.ReactNode
}

export function AssetCard({ name, type, size, date, preview, icon }: AssetCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
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
        cursor: 'default',
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
        }}
      />

      {/* Preview area */}
      <div
        style={{
          height: '140px',
          background: 'rgba(27,58,95,0.05)',
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
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
