import { ColorSwatch, type ColorSwatchProps } from './ColorSwatch'

interface ColorPaletteProps {
  colors: ColorSwatchProps[]
  title?: string
}

export function ColorPalette({ colors, title }: ColorPaletteProps) {
  return (
    <div style={{ margin: '24px 0' }}>
      {title && (
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 500,
          color: '#1B3A5F',
          marginTop: 0,
          marginBottom: '16px',
        }}>
          {title}
        </h3>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '14px',
      }}>
        {colors.map(color => (
          <ColorSwatch key={color.hex + color.name} {...color} />
        ))}
      </div>
    </div>
  )
}
