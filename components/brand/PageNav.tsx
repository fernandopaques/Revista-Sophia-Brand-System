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
    <div className="page-nav-mt">
      <div className="page-nav-divider" />

      <div className="page-nav-wrap">
        {prev ? (
          <Link href={`/brand/${prev.slug}`} className="page-nav-pill">
            <ChevronLeft size={15} style={{ flexShrink: 0 }} />
            <span>{prev.title}</span>
          </Link>
        ) : (
          <div className="page-nav-spacer" />
        )}

        {next ? (
          <Link href={`/brand/${next.slug}`} className="page-nav-pill page-nav-pill--next">
            <span>{next.title}</span>
            <ChevronRight size={15} style={{ flexShrink: 0 }} />
          </Link>
        ) : (
          <div className="page-nav-spacer" />
        )}
      </div>
    </div>
  )
}
