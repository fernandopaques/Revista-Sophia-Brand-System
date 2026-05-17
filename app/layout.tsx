import type { Metadata } from 'next'
import { EB_Garamond, Crimson_Text, Source_Sans_3, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-text',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-source-sans-3',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brand System — Editora Teosófica',
  description: 'Sistema de identidade de marca da Editora Teosófica',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${ebGaramond.variable} ${crimsonText.variable} ${sourceSans3.variable} ${cormorantGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
