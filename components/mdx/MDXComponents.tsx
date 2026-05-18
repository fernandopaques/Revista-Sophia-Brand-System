import type { MDXComponents } from 'mdx/types'
import { ColorPalette } from '@/components/brand/ColorPalette'
import { ColorSwatch } from '@/components/brand/ColorSwatch'
import { FontSpecimen } from '@/components/brand/FontSpecimen'
import { FontShowcase } from '@/components/brand/FontShowcase'
import { Callout } from '@/components/brand/Callout'
import { AssetDownload } from '@/components/brand/AssetDownload'

/**
 * Retorna o map de componentes MDX customizados da Revista Sophia.
 * Os overrides de elementos HTML usam inline styles para garantir
 * funcionamento independente da compilação do Tailwind.
 *
 * Uso em mdx-components.ts (raiz): export { getMDXComponents as useMDXComponents }
 * Uso em page.tsx: <MDXContent components={getMDXComponents()} />
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // ===== OVERRIDES DE ELEMENTOS HTML =====

    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '42px',
          fontWeight: 700,
          color: '#1B3A5F',
          lineHeight: 1.15,
          marginBottom: '10px',
          marginTop: 0,
          letterSpacing: '-0.01em',
        }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '28px',
          fontWeight: 600,
          color: '#1B3A5F',
          borderBottom: '1px solid rgba(218,165,32,0.22)',
          paddingBottom: '10px',
          marginTop: '48px',
          marginBottom: '18px',
        }}
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '22px',
          fontWeight: 600,
          color: '#1B3A5F',
          marginTop: '36px',
          marginBottom: '12px',
        }}
      >
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4
        style={{
          fontFamily: 'var(--font-subheading)',
          fontSize: '18px',
          fontWeight: 500,
          color: '#1B3A5F',
          marginTop: '28px',
          marginBottom: '10px',
        }}
      >
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '16px',
          lineHeight: 1.8,
          color: '#0A0F1B',
          marginBottom: '18px',
        }}
      >
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote
        style={{
          fontFamily: 'var(--font-quote)',
          fontSize: '20px',
          fontStyle: 'italic',
          borderLeft: '3px solid #DAA520',
          paddingLeft: '20px',
          color: '#1B3A5F',
          margin: '32px 0',
          lineHeight: 1.6,
        }}
      >
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-ui)',
            fontSize: '15px',
          }}
        >
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th
        style={{
          background: '#1B3A5F',
          color: '#E5DCC7',
          padding: '12px 16px',
          textAlign: 'left',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #D4C9AF',
          color: '#0A0F1B',
          fontSize: '15px',
          verticalAlign: 'top',
        }}
      >
        {children}
      </td>
    ),

    ul: ({ children }) => (
      <ul
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '16px',
          lineHeight: 1.75,
          color: '#0A0F1B',
          paddingLeft: '20px',
          marginBottom: '16px',
        }}
      >
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '16px',
          lineHeight: 1.75,
          color: '#0A0F1B',
          paddingLeft: '20px',
          marginBottom: '16px',
        }}
      >
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li style={{ marginBottom: '6px' }}>{children}</li>
    ),

    hr: () => (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid rgba(218,165,32,0.2)',
          margin: '32px 0',
        }}
      />
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        style={{
          color: '#DAA520',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {children}
      </a>
    ),

    code: ({ children }) => (
      <code
        style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          background: 'rgba(27,58,95,0.08)',
          padding: '2px 6px',
          borderRadius: '4px',
          color: '#1B3A5F',
        }}
      >
        {children}
      </code>
    ),

    pre: ({ children }) => (
      <pre
        style={{
          background: '#0A0F1B',
          color: '#E5DCC7',
          padding: '20px',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '14px',
          lineHeight: 1.6,
          margin: '24px 0',
        }}
      >
        {children}
      </pre>
    ),

    // ===== COMPONENTES CUSTOMIZADOS DA RS =====
    ColorPalette,
    ColorSwatch,
    FontSpecimen,
    FontShowcase,
    Callout,
    AssetDownload,

    // Spread de overrides externos (passados pelo consumidor)
    ...components,
  }
}
