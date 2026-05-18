export function SectionManifesto() {
  return (
    <section
      id="manifesto"
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
          marginBottom: 'clamp(20px, 3vw, 32px)',
        }}>
          02 — Manifesto
        </p>

        {/* Frase de soco — escala dramática */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: '#E5DCC7',
          marginBottom: 'clamp(40px, 6vw, 80px)',
        }}>
          O mundo banalizou o sagrado.<br />
          <span style={{ color: '#DAA520' }}>A Sophia recusa esse mercado.</span>
        </h2>

        {/* Manifesto em duas colunas no desktop, 1 no mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            fontFamily: 'var(--font-subheading)',
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'rgba(229,220,199,0.88)',
          }}
        >
          <div>
            <p style={{ marginBottom: '20px' }}>
              Vivemos numa era que reduziu a sabedoria a produto. Iluminação em
              sete passos. Cura em três cliques. Tradições milenares embaladas para
              consumo rápido — o sagrado transformado em algoritmo.
            </p>
            <p>
              A Revista Sophia não compete com esse mercado. Ela se recusa a
              existir dentro dele. Não traduzimos a profundidade em legenda. Não
              simplificamos o que pede silêncio.
            </p>
          </div>

          <div>
            <p style={{ marginBottom: '20px' }}>
              Aqui, o leitor não é um cliente — é um buscador. E o conhecimento não
              é um produto — é uma travessia. Custodiamos uma herança que pertence
              a quem está disposto a caminhar com ela.
            </p>
            <p style={{
              fontFamily: 'var(--font-quote)',
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              fontStyle: 'italic',
              color: '#DAA520',
              lineHeight: 1.4,
            }}>
              Sophia não acelera o que não pode ser acelerado.
              Acompanha quem aceita o tempo da travessia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
