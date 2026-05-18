export function SectionPorQueSophia() {
  return (
    <section
      id="por-que-sophia"
      className="public-section public-section--invert"
    >
      <div className="public-section-inner--wide" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: 'clamp(24px, 4vw, 48px)',
        position: 'relative',
      }}>
        {/* Número 01 em grande, deslocado */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'clamp(20px, 4vw, 56px)',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 400,
            color: 'rgba(218,165,32,0.32)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            flexShrink: 0,
            fontVariantNumeric: 'tabular-nums',
          }}>
            01
          </span>

          <div style={{ flex: 1, paddingTop: 'clamp(8px, 1.5vw, 24px)' }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#704214',
              marginBottom: '20px',
            }}>
              Por que Sophia
            </p>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              color: '#1B3A5F',
              marginBottom: '28px',
            }}>
              Existe uma sabedoria que se busca quando o mundo oferece atalhos.
            </h2>

            <div style={{
              fontFamily: 'var(--font-subheading)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'rgba(10,15,27,0.78)',
            }}>
              <p style={{ marginBottom: '16px' }}>
                A Revista Sophia é a voz editorial da Sociedade Teosófica no Brasil — uma
                tradição com mais de 150 anos dedicada a investigar a unidade essencial da vida
                e o despertar das faculdades latentes do ser humano.
              </p>
              <p>
                Não publicamos por mercado. Publicamos porque acreditamos que existe um
                caminho — e ele exige tempo, atenção e respeito ao mistério.
              </p>
            </div>
          </div>
        </div>

        {/* Pull quote — frase âncora de Blavatsky */}
        <figure style={{
          marginTop: 'clamp(32px, 6vw, 64px)',
          paddingLeft: 'clamp(16px, 3vw, 32px)',
          borderLeft: '2px solid #DAA520',
        }}>
          <blockquote style={{
            fontFamily: 'var(--font-quote)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.3,
            color: '#1B3A5F',
            letterSpacing: '-0.005em',
            margin: 0,
            marginBottom: '14px',
          }}>
            “A verdadeira Teosofia é altruísmo. É amor fraternal, mútua ajuda e
            constante devoção à Verdade.”
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
