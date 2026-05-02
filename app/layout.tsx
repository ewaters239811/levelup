import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Identity Collapse Index',
  description: 'A 4-question diagnostic to reveal where your identity is blocking your next level.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const beehiivEnabled = Boolean(
    process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL?.trim(),
  )

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {beehiivEnabled ? (
          <Script
            id="beehiiv-attribution"
            src="https://subscribe-forms.beehiiv.com/attribution.js"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  )
}

