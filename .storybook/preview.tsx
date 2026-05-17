import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'creme',
      values: [
        { name: 'creme', value: '#E5DCC7' },
        { name: 'azul', value: '#1B3A5F' },
        { name: 'preto', value: '#0A0F1B' },
        { name: 'branco', value: '#ffffff' },
      ],
    },
  },
}

export default preview
