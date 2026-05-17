'use client'

interface AssetBannerProps {
  title: string
  subtitle: string
  gradient: string
}

export function AssetBanner({ title, subtitle, gradient }: AssetBannerProps) {
  return (
    <>
      <style>{`
        @keyframes assetGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        style={{
          height: '180px',
          background: gradient,
          backgroundSize: '400% 400%',
          animation: 'assetGradientShift 8s ease infinite',
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '38px',
            fontWeight: 700,
            color: '#E5DCC7',
            margin: 0,
            lineHeight: 1.15,
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
          }}
        >
          {subtitle}
        </p>
      </div>
    </>
  )
}
