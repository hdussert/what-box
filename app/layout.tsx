import { env } from '@/env'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/const'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  // Makes canonical and Open Graph URLs absolute, on every deployment
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`dark font-sans ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}
export default RootLayout
