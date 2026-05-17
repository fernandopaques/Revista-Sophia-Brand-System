interface FontSpecimenProps {
  /** Nome da família tipográfica, e.g. "EB Garamond" */
  family: string
  /** Variável CSS da fonte, e.g. "var(--font-heading)" */
  cssVar: string
  /** Função/papel da fonte, e.g. "Títulos e Headings" */
  role: string
  /** Pesos disponíveis, e.g. ["400 Regular", "600 SemiBold"] */
  weights?: string[]
  /** Texto de amostra customizado */
  sample?: string
}

export function FontSpecimen({
  family,
  cssVar,
  role,
  weights = ['400 Regular'],
  sample,
}: FontSpecimenProps) {
  const sampleText = sample ?? 'A sabedoria não tem fronteiras'

  return (
    <div
      style={{
        background: '#F5F1E8',
        border: '1px solid rgba(218,165,32,0.15)',
        borderRadius: '10px',
        padding: '28px',
        margin: '16px 0',
      }}
    >
      {/* Amostra grande */}
      <p
        style={{
          fontFamily: cssVar,
          fontSize: '36px',
          color: '#1B3A5F',
          lineHeight: 1.2,
          margin: 0,
          marginBottom: '16px',
        }}
      >
        {sampleText}
      </p>

      {/* Alfabeto + numerais */}
      <p
        style={{
          fontFamily: cssVar,
          fontSize: '16px',
          color: 'rgba(10,15,27,0.5)',
          letterSpacing: '0.05em',
          marginBottom: '16px',
          lineHeight: 1.6,
          margin: 0,
          marginBottom: '16px',
        } as React.CSSProperties}
      >
        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
        {' '}0 1 2 3 4 5 6 7 8 9
      </p>

      {/* Rodapé com metadados */}
      <div
        style={{
          borderTop: '1px solid rgba(218,165,32,0.15)',
          paddingTop: '16px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            color: '#1B3A5F',
            margin: 0,
            marginBottom: '4px',
          }}
        >
          {family}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            color: '#DAA520',
            margin: 0,
            marginBottom: '8px',
          }}
        >
          {role}
        </p>

        {/* Badges de peso */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {weights.map((w) => (
            <span
              key={w}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                color: 'rgba(10,15,27,0.55)',
                background: 'rgba(218,165,32,0.08)',
                padding: '3px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(218,165,32,0.15)',
                display: 'inline-block',
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
