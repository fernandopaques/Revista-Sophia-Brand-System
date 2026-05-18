const VALUES = [
  {
    num: 'I',
    title: 'Profundidade',
    description: 'Preferimos o texto difícil ao texto raso. A pressa não nos pertence — porque o que vale a pena entender raramente se entrega no primeiro olhar.',
  },
  {
    num: 'II',
    title: 'Integridade',
    description: 'Servimos a uma tradição viva. Não a entregamos a modismos, não a editamos para caber em formatos que a distorcem.',
  },
  {
    num: 'III',
    title: 'Acolhimento',
    description: 'O leitor é convidado, não convertido. Não exigimos vocabulário prévio — oferecemos passagem, com respeito a quem chega de qualquer lugar.',
  },
  {
    num: 'IV',
    title: 'Continuidade',
    description: 'Cada edição não termina. Continua na próxima, e na próxima. A leitura é jornada — e a jornada não tem trecho final.',
  },
]

export function SectionOQueNosMove() {
  return (
    <section
      id="o-que-nos-move"
      className="public-section public-section--invert"
    >
      <div className="public-section-inner--wide">
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#704214',
          marginBottom: 'clamp(16px, 2vw, 24px)',
        }}>
          03 — O que nos move
        </p>

        {/* Título */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.75rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#1B3A5F',
          marginBottom: 'clamp(36px, 6vw, 64px)',
          maxWidth: '20ch',
        }}>
          Quatro convicções que não negociamos.
        </h2>

        {/* Grid 2×2 de valores */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 2.5vw, 32px)',
          }}
        >
          {VALUES.map(v => (
            <article
              key={v.num}
              style={{
                background: '#FAF5E6',
                border: '1px solid rgba(112,66,20,0.16)',
                borderRadius: '14px',
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 220ms ease, border-color 220ms ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#DAA520',
                  letterSpacing: '0.06em',
                  minWidth: '28px',
                }}>
                  {v.num}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  fontWeight: 600,
                  color: '#1B3A5F',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}>
                  {v.title}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-subheading)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.65,
                color: 'rgba(10,15,27,0.72)',
                margin: 0,
              }}>
                {v.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
