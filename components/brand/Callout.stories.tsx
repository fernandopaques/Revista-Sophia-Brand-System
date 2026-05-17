import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Callout } from './Callout'

const meta = {
  title: 'Brand/Callout',
  component: Callout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Note: Story = {
  render: () => (
    <Callout type="note">
      Esta é uma observação importante sobre as diretrizes da marca.
    </Callout>
  ),
}

export const Warning: Story = {
  render: () => (
    <Callout type="warning">
      Atenção: não use estas cores em fundos escuros.
    </Callout>
  ),
}

export const Tip: Story = {
  render: () => (
    <Callout type="tip">
      Dica: prefira fontes serifadas para títulos impressos.
    </Callout>
  ),
}

export const Quote: Story = {
  render: () => (
    <Callout type="quote">
      A sabedoria não tem fronteiras.
    </Callout>
  ),
}

export const ComTituloCustom: Story = {
  render: () => (
    <Callout type="note" title="Lembre-se">
      Consistência é a chave da marca.
    </Callout>
  ),
}
