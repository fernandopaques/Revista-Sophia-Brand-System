import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FontSpecimen } from './FontSpecimen'

const meta = {
  title: 'Brand/FontSpecimen',
  component: FontSpecimen,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FontSpecimen>

export default meta
type Story = StoryObj<typeof meta>

export const Heading: Story = {
  args: {
    family: 'EB Garamond',
    cssVar: 'var(--font-heading)',
    role: 'Títulos e Headings',
    weights: ['400 Regular', '500 Medium', '600 SemiBold', '700 Bold'],
  },
}

export const Body: Story = {
  args: {
    family: 'Crimson Text',
    cssVar: 'var(--font-body)',
    role: 'Corpo de texto',
    weights: ['400 Regular', '600 SemiBold'],
  },
}

export const UI: Story = {
  args: {
    family: 'Source Sans 3',
    cssVar: 'var(--font-ui)',
    role: 'Interface e legenda',
    weights: ['300 Light', '400 Regular', '600 SemiBold'],
  },
}

export const ComSampleCustom: Story = {
  args: {
    family: 'EB Garamond',
    cssVar: 'var(--font-heading)',
    role: 'Títulos e Headings',
    weights: ['400 Regular', '700 Bold'],
    sample: 'Theosophy unites humanity',
  },
}
