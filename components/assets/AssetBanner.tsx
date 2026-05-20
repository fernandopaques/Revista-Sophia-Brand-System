'use client'

interface AssetBannerProps {
  title: string
  subtitle: string
  gradient: string
}

export function AssetBanner({ title, subtitle, gradient }: AssetBannerProps) {
  return (
    <div
      className="asset-banner"
      style={{ '--banner-gradient': gradient } as React.CSSProperties}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '38px',
          fontWeight: 700,
          color: '#E5DCC7',
          margin: 0,
          lineHeight: 1.15,
          position: 'relative',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '15px',
          color: 'rgba(229,220,199,0.7)',
          marginTop: '8px',
          marginBottom: 0,
          position: 'relative',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
