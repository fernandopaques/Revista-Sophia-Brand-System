import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PromptArea } from './PromptArea'

const meta = {
  title: 'Home/PromptArea',
  component: PromptArea,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'creme' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PromptArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
