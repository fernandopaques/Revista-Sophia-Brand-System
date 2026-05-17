'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

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

export function ColorSwatch({
  hex, name, role, description, rgb, cmyk, pantone, cssVar,
}: ColorSwatchProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const cardRef  = useRef<HTMLDivElement>(null)
  const popRef   = useRef<HTMLDivElement>(null)

  const hasDetails = !!(description || rgb || cmyk || pantone || cssVar)
  const isLight    = isLightHex(hex)

  const handleClick = useCallback(() => {
    if (!cardRef.current) return
    if (!open) {
      const rect  = cardRef.current.getBoundingClientRect()
      const pw    = 288
      const gap   = 10
      const goLeft = rect.right + pw + gap > window.innerWidth
      setPos({
        top:  Math.min(rect.top, window.innerHeight - 320),
        left: goLeft ? rect.left - pw - gap : rect.right + gap,
      })
    }
    setOpen(v => !v)
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (
        cardRef.current?.contains(e.target as Node) ||
        popRef.current?.contains(e.target as Node)
      ) return
      setOpen(false)
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const specs: { label: string; value: string }[] = [
    { label: 'HEX',     value: hex.toUpperCase() },
    ...(rgb     ? [{ label: 'RGB',     value: rgb     }] : []),
    ...(cmyk    ? [{ label: 'CMYK',    value: cmyk    }] : []),
    ...(pantone ? [{ label: 'Pantone', value: pantone }] : []),
    ...(cssVar  ? [{ label: 'CSS',     value: `var(${cssVar})` }] : []),
  ]

  return (
    <>
      {/* ── Swatch card ─────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        onClick={hasDetails ? handleClick : undefined}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: open
            ? '1.5px solid rgba(218,165,32,0.55)'
            : '1px solid rgba(218,165,32,0.18)',
          cursor: hasDetails ? 'pointer' : 'default',
          transition: 'border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease',
          transform: open ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: open ? '0 8px 28px rgba(0,0,0,0.14)' : 'none',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          if (!open && hasDetails) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }
        }}
      >
        {/* Color block */}
        <div style={{ height: '140px', background: hex, position: 'relative' }}>
          {hasDetails && (
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              width: '22px', height: '22px', borderRadius: '50%',
              background: isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 700,
                color: isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)',
                lineHeight: 1,
              }}>i</span>
            </div>
          )}
        </div>

        {/* Name strip */}
        <div style={{ padding: '10px 14px', background: 'rgba(10,15,27,0.9)' }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 500,
            color: '#E5DCC7', margin: 0, lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {name}
          </p>
        </div>
      </div>

      {/* ── Popover (fixed) ──────────────────────────────────────────────── */}
      {open && hasDetails && (
        <div
          ref={popRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: '288px',
            background: '#1A2030',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '7px',
              background: hex, flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.15)',
            }} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                {name}
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.3 }}>
                {role}
              </p>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.55 }}>
                {description}
              </p>
            </div>
          )}

          {/* Specs */}
          <div style={{ padding: '6px 0 8px' }}>
            {specs.map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '7px 16px',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {label}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#fff', fontWeight: 500 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function isLightHex(hex: string): boolean {
  if (!hex.startsWith('#') || hex.length < 7) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
