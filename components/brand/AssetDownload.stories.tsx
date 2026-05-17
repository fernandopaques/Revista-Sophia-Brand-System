import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AssetDownload } from './AssetDownload'

const meta = {
  title: 'Brand/AssetDownload',
  component: AssetDownload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AssetDownload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Logo ET — PNG',
    file: 'logo-et.png',
    format: 'PNG',
    size: '2.4 MB',
  },
}

export const SVG: Story = {
  args: {
    label: 'Logo ET — SVG',
    file: 'logo-et.svg',
    format: 'SVG',
  },
}

export const ZIP: Story = {
  args: {
    label: 'Pacote de Marca',
    file: 'brand-pack.zip',
    format: 'ZIP',
    size: '12 MB',
  },
}
