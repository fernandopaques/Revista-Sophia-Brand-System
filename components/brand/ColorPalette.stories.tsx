import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ColorPalette } from './ColorPalette'

const meta = {
  title: 'Brand/ColorPalette',
  component: ColorPalette,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colors: [
      { hex: '#DAA520', name: 'Ouro', role: 'Cor primária', pantone: 'Pantone 109 C' },
      { hex: '#1B3A5F', name: 'Azul Teosófico', role: 'Fundo e estrutura', pantone: 'Pantone 294 C' },
      { hex: '#E5DCC7', name: 'Creme', role: 'Fundo claro' },
    ],
  },
}

export const ComTitulo: Story = {
  args: {
    title: 'Paleta Principal',
    colors: [
      { hex: '#DAA520', name: 'Ouro', role: 'Cor primária', pantone: 'Pantone 109 C' },
      { hex: '#1B3A5F', name: 'Azul Teosófico', role: 'Fundo e estrutura', pantone: 'Pantone 294 C' },
      { hex: '#E5DCC7', name: 'Creme', role: 'Fundo claro' },
      { hex: '#0A0F1B', name: 'Preto', role: 'Texto principal' },
      { hex: '#6B4E8F', name: 'Violeta', role: 'Destaque espiritual' },
      { hex: '#704214', name: 'Bronze', role: 'Identidade Visual' },
    ],
  },
}
