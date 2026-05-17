import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AppShell } from './AppShell'

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/brand/manifesto' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '40px', fontFamily: 'var(--font-body)', color: '#0A0F1B' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#1B3A5F', fontSize: '32px' }}>
          Conteúdo da Página
        </h1>
        <p>Exemplo de conteúdo renderizado dentro do AppShell.</p>
      </div>
    ),
  },
}
