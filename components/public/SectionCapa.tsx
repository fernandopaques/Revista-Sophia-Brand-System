const LOGO_URL =
  'https://soqtksiiztlvsweotylz.supabase.co/storage/v1/object/public/brand-assets/' +
  'outros/5fe15a95-bb40-4fc5-bc2c-47684039e7f8-LOGO SOPHIA WEB.webp'

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
        {/* Logo Sophia — substitui o letreiro tipográfico */}
        <img
          src={LOGO_URL}
          alt="Sophia"
          style={{
            width: 'clamp(320px, 82vw, 1120px)',
            height: 'auto',
            display: 'block',
          }}
        />

        {/* Subtítulo Brand Book */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(13px, 1.2vw, 15px)',
          fontWeight: 500,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: '#E5DCC7',
          margin: 0,
        }}>
          Brand Book
        </p>
      </div>
    </section>
  )
}
