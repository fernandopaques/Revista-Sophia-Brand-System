export function SectionONome() {
  return (
    <section
      id="o-nome"
      className="public-section"
    >
      <div className="public-section-inner--wide">
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#DAA520',
          marginBottom: 'clamp(24px, 3vw, 40px)',
        }}>
          04 — O Nome
        </p>

        {/* Layout: σοφία em escala + texto */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(28px, 5vw, 64px)',
          alignItems: 'center',
        }}>
          {/* Palavra grega — peça visual */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4.5rem, 14vw, 12rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#DAA520',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            opacity: 0.92,
          }}>
            σοφία
          </div>

          {/* Texto */}
          <div style={{
            maxWidth: '64ch',
            fontFamily: 'var(--font-subheading)',
            fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)',
            lineHeight: 1.7,
            color: 'rgba(229,220,199,0.88)',
          }}>
            <p style={{ marginBottom: '20px' }}>
              <em style={{ color: '#DAA520' }}>Sophia</em> é a palavra grega para
              sabedoria. Não a sabedoria que se acumula como informação — a sabedoria
              que se torna modo de viver.
            </p>

            <p style={{ marginBottom: '20px' }}>
              Foi de Sophia que nasceu a <em>Filosofia</em> — o amor por essa
              sabedoria. E é Sophia o nome que a <em>Teosofia</em> carrega em sua
              raiz: <em>theos</em> + <em>sophia</em>, a sabedoria divina, aquela
              que se busca não para dominar, mas para servir.
            </p>

            <p style={{
              fontFamily: 'var(--font-quote)',
              fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
              fontStyle: 'italic',
              lineHeight: 1.4,
              color: '#E5DCC7',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(218,165,32,0.20)',
            }}>
              Quando esta revista escolheu seu nome, não escolheu uma palavra
              bonita. Escolheu uma herança.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
