import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SidebarNav } from './SidebarNav'

const meta = {
  title: 'Layout/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'azul' },
    nextjs: { navigation: { pathname: '/brand/posicionamento' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SemSelecao: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/' } },
  },
}
