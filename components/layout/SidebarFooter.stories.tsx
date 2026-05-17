import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SidebarFooter } from './SidebarFooter'

const meta = {
  title: 'Layout/SidebarFooter',
  component: SidebarFooter,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'azul' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
