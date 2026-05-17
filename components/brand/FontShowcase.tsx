interface FontShowcaseProps {
  family: string
  cssVar: string
  role: string
  designer?: string
  googleFontsUrl?: string
  tags?: string[]
  sample?: string
  italic?: boolean
  weights?: string[]
}

export function FontShowcase({
  family,
  cssVar,
  role,
  designer,
  googleFontsUrl,
  tags = [],
  sample,
  italic = false,
  weights = [],
}: FontShowcaseProps) {
  const displayText = sample ?? 'A sabedoria não tem fronteiras'

  return (
    <div style={{ margin: '20px 0 8px' }}>
      {/* Dark showcase card */}
      <div style={{
        background: '#0D1117',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(218,165,32,0.15)',
      }}>
        {/* Card header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '6px',
          }}>
            <p style={{
              fontFamily: cssVar,
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              lineHeight: 1.2,
            }}>
              {family}
            </p>
            {designer && (
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
                margin: 0,
                alignSelf: 'flex-end',
              }}>
                {googleFontsUrl ? (
                  <a href={googleFontsUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgba(218,165,32,0.7)', textDecoration: 'none' }}>
                    {designer}
                  </a>
                ) : designer}
              </p>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
            }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '3px 10px',
                  whiteSpace: 'nowrap',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Weights */}
          {weights.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              marginTop: tags.length > 0 ? '8px' : '0',
            }}>
              {weights.map(w => (
                <span key={w} style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: 'rgba(218,165,32,0.6)',
                  background: 'rgba(218,165,32,0.07)',
                  border: '1px solid rgba(218,165,32,0.15)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                }}>
                  {w}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Large specimen text */}
        <div style={{
          padding: '32px 28px 36px',
          background: 'linear-gradient(180deg, #0D1117 0%, #111820 100%)',
        }}>
          <p style={{
            fontFamily: cssVar,
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            margin: 0,
            fontStyle: italic ? 'italic' : 'normal',
            letterSpacing: '-0.01em',
          }}>
            {displayText}
          </p>
        </div>
      </div>

      {/* Google Fonts note */}
      {googleFontsUrl && (
        <p style={{
          fontFamily: 'var(--font-subheading)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'rgba(10,15,27,0.4)',
          textAlign: 'center',
          margin: '10px 0 0',
        }}>
          Disponível gratuitamente no{' '}
          <a href={googleFontsUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: '#DAA520', fontWeight: 600, textDecoration: 'none' }}>
            Google Fonts
          </a>.
        </p>
      )}
    </div>
  )
}
