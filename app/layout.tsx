import { EARLY_INSTALL_PROMPT_SCRIPT } from '@/components/pwa/installPrompt'
import PwaSetup from '@/components/pwa/PwaSetup'
import { env } from '@/env'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  THEME_COLOR,
} from '@/lib/const'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

// Self-hosted (Latin, variable weight) so builds don't depend on Google
// Fonts being reachable; licenses sit next to the files
const inter = localFont({
  src: '../assets/fonts/Inter-Variable-latin.woff2',
  variable: '--font-inter',
  weight: '100 900',
})

const jetBrainsMono = localFont({
  src: '../assets/fonts/JetBrainsMono-Variable-latin.woff2',
  variable: '--font-mono',
  weight: '100 800',
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
  // iOS ignores the manifest's display mode: this opens it full-screen too
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'black' },
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    // suppressHydrationWarning: a script below adds a class before hydration
    <html
      lang="en"
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.self !== window.top) document.documentElement.classList.add('in-iframe')`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: EARLY_INSTALL_PROMPT_SCRIPT }}
        />
      </head>
      <body
        className={`font-sans ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <PwaSetup />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}
export default RootLayout
