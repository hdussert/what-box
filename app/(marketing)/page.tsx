import Features from '@/components/marketing/Features'
import Hero from '@/components/marketing/Hero'
import HowItWorks from '@/components/marketing/HowItWorks'
import Pitch from '@/components/marketing/Pitch'
import SignUpCta from '@/components/marketing/SignUpCta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const LandingPage = () => {
  // Signed-in visitors never get here: proxy.ts redirects them to /dashboard
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24  px-8 pb-32 md:px-24">
      <Hero />
      <Pitch />
      <HowItWorks />
      <Features />
      <SignUpCta />
    </main>
  )
}

export default LandingPage
