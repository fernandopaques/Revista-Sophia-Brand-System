export function SectionCapa() {
  return (
    <section
      id="capa"
      className="public-section"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(24px, 4vh, 56px)',
      }}>
        {/* Sub-label discreta acima do hero */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(229,220,199,0.55)',
        }}>
          Revista — Sociedade Teosófica no Brasil
        </p>

        {/* Hero — "Sophia" em escala monumental */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'clamp(5rem, 18vw, 16rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          color: '#DAA520',
          margin: 0,
        }}>
          Sophia
        </h1>

        {/* Subtítulo Brand Book */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(13px, 1.2vw, 15px)',
          fontWeight: 500,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: '#E5DCC7',
        }}>
          Brand Book
        </p>
      </div>

    </section>
  )
}
