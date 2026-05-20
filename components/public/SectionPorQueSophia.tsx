export function SectionPorQueSophia() {
  return (
    <section
      id="por-que-sophia"
      className="public-section public-section--invert"
    >
      <div className="public-section-inner--wide" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(28px, 4vw, 52px)',
      }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#704214',
        }}>
          Por que Sophia
        </p>

        {/* Título */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-0.015em',
          color: '#1B3A5F',
          maxWidth: '680px',
        }}>
          Existe uma sabedoria que se busca quando o mundo oferece atalhos.
        </h2>

        {/* Corpo */}
        <div style={{
          fontFamily: 'var(--font-subheading)',
          fontSize: 'clamp(1.125rem, 1.4vw, 1.25rem)',
          lineHeight: 1.7,
          color: 'rgba(10,15,27,0.78)',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <p>
            A Revista Sophia é a voz editorial da Sociedade Teosófica no Brasil — uma
            tradição com mais de 150 anos dedicada a investigar a unidade essencial da vida
            e o despertar das faculdades latentes do ser humano.
          </p>
          <p>
            Não publicamos por mercado. Publicamos porque acreditamos que existe um
            caminho — e ele exige tempo, atenção e respeito ao mistério.
          </p>
        </div>

        {/* Pull quote */}
        <figure style={{
          paddingLeft: 'clamp(16px, 3vw, 32px)',
          borderLeft: '2px solid #DAA520',
          margin: 0,
        }}>
          <blockquote style={{
            fontFamily: 'var(--font-quote)',
            fontSize: 'clamp(1.375rem, 3vw, 2.25rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.35,
            color: '#1B3A5F',
            letterSpacing: '-0.005em',
            margin: 0,
            marginBottom: '12px',
          }}>
            "A verdadeira Teosofia é altruísmo. É amor fraternal, mútua ajuda e
            constante devoção à Verdade."
          </blockquote>
          <figcaption style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '13px',
            color: 'rgba(10,15,27,0.55)',
            letterSpacing: '0.04em',
          }}>
            H. P. Blavatsky — fundadora da Sociedade Teosófica
          </figcaption>
        </figure>

      </div>
    </section>
  )
}
