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
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'What Box',
  description: 'Inventory management made simple',
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
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
