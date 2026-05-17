'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NavModule } from '@/lib/navigation'

interface PageNavProps {
  prev: NavModule | null
  next: NavModule | null
}

export function PageNav({ prev, next }: PageNavProps) {
  if (!prev && !next) return null

  return (
    <div style={{ marginTop: '64px' }}>
      <div style={{
        height: '1px',
        background: 'rgba(218,165,32,0.2)',
        marginBottom: '28px',
      }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        paddingBottom: '48px',
      }}>
        {/* Prev */}
        {prev ? (
          <Link href={`/brand/${prev.slug}`} style={{ textDecoration: 'none' }}>
            <NavPill direction="prev" label={prev.title} />
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link href={`/brand/${next.slug}`} style={{ textDecoration: 'none' }}>
            <NavPill direction="next" label={next.title} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

function NavPill({ direction, label }: { direction: 'prev' | 'next'; label: string }) {
  const isPrev = direction === 'prev'
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: '#1B3A5F',
        border: '1px solid rgba(218,165,32,0.2)',
        borderRadius: '999px',
        color: '#E5DCC7',
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 150ms ease',
        cursor: 'pointer',
        maxWidth: '220px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#254d7a'
        el.style.borderColor = 'rgba(218,165,32,0.5)'
        el.style.color = '#DAA520'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = '#1B3A5F'
        el.style.borderColor = 'rgba(218,165,32,0.2)'
        el.style.color = '#E5DCC7'
      }}
    >
      {isPrev && <ChevronLeft size={15} style={{ flexShrink: 0 }} />}
      <span style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {label}
      </span>
      {!isPrev && <ChevronRight size={15} style={{ flexShrink: 0 }} />}
    </div>
  )
}
