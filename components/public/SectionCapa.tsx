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
        gap: 'clamp(20px, 3vh, 40px)',
      }}>
        {/* Hero — "SOPHIA" em escala monumental, peso regular */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 400,
          fontSize: 'clamp(4.5rem, 18vw, 16rem)',
          lineHeight: 0.95,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
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
