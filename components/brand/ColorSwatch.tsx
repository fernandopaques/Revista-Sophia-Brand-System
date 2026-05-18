'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

export interface ColorSwatchProps {
  hex: string
  name: string
  role: string
  description?: string
  rgb?: string
  cmyk?: string
  pantone?: string
  cssVar?: string
}

function formatRgb(rgb: string): string {
  const parts = rgb.split(/,\s*/)
  if (parts.length !== 3) return rgb
  return `R ${parts[0]} G ${parts[1]} B ${parts[2]}`
}

function formatCmyk(cmyk: string): string {
  const parts = cmyk.split(/\s*\/\s*/)
  if (parts.length !== 4) return cmyk
  return `C${parts[0]} M${parts[1]} Y${parts[2]} K${parts[3]}`
}

function isLightHex(hex: string): boolean {
  if (!hex.startsWith('#') || hex.length < 7) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

export function ColorSwatch({ hex, name, rgb, cmyk, pantone, cssVar }: ColorSwatchProps) {
  const [copied, setCopied]   = useState(false)
  const [hovered, setHovered] = useState(false)
  const isLight = isLightHex(hex)

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(hex.toUpperCase())
    } catch {
      /* clipboard not available */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [hex])

  const iconBg  = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)'
  const iconClr = isLight ? 'rgba(0,0,0,0.7)'  : 'rgba(255,255,255,0.9)'

  return (
    <div>
      {/* ── Swatch block ── */}
      <div
        style={{
          height: '140px',
          background: hex,
          borderRadius: '6px',
          position: 'relative',
          cursor: 'pointer',
          marginBottom: '10px',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hovered ? '0 6px 20px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCopy}
        title={`Copiar ${hex.toUpperCase()}`}
      >
        {/* Copy icon — shows on hover */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 150ms ease',
          }}
        >
          {copied
            ? <Check size={14} color={iconClr} />
            : <Copy  size={14} color={iconClr} />
          }
        </div>
      </div>

      {/* ── Info below ── */}
      <div>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '14px',
          fontWeight: 700,
          color: '#0A0F1B',
          marginBottom: '5px',
          lineHeight: 1.3,
        }}>
          {name}
        </p>

        <p style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'rgba(10,15,27,0.65)',
          marginBottom: '2px',
          lineHeight: 1.5,
        }}>
          {hex.toUpperCase()}
        </p>

        {rgb && (
          <p style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: 'rgba(10,15,27,0.45)',
            marginBottom: '1px',
            lineHeight: 1.5,
          }}>
            {formatRgb(rgb)}
          </p>
        )}

        {cmyk && (
          <p style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: 'rgba(10,15,27,0.45)',
            marginBottom: '1px',
            lineHeight: 1.5,
          }}>
            {formatCmyk(cmyk)}
          </p>
        )}

        {pantone && (
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            color: 'rgba(10,15,27,0.4)',
            marginBottom: 0,
            lineHeight: 1.5,
          }}>
            Pantone {pantone}
          </p>
        )}

        {cssVar && (
          <p style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(10,15,27,0.3)',
            marginBottom: 0,
            lineHeight: 1.5,
          }}>
            var({cssVar})
          </p>
        )}
      </div>
    </div>
  )
}
