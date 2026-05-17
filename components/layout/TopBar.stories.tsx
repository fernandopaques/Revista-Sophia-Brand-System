import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TopBar } from './TopBar'

const meta = {
  title: 'Layout/TopBar',
  component: TopBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
