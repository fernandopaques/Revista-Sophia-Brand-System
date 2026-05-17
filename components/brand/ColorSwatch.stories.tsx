import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ColorSwatch } from './ColorSwatch'

const meta = {
  title: 'Brand/ColorSwatch',
  component: ColorSwatch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hex: '#DAA520',
    name: 'Ouro',
    role: 'Cor primária',
    pantone: 'Pantone 109 C',
  },
}

export const Azul: Story = {
  args: {
    hex: '#1B3A5F',
    name: 'Azul Teosófico',
    role: 'Fundo e estrutura',
    pantone: 'Pantone 294 C',
  },
}

export const Creme: Story = {
  args: {
    hex: '#E5DCC7',
    name: 'Creme',
    role: 'Fundo claro',
  },
}

export const SemPantone: Story = {
  args: {
    hex: '#6B4E8F',
    name: 'Violeta',
    role: 'Destaque espiritual',
  },
}
