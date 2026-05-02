import './globals.css'
import Providers from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Appurva Herbals',
  description: 'Doctor-facing product catalogue for Appurva Herbals',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
