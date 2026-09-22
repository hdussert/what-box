import Hero from '@/components/marketing/Hero'
import HowItWorks from '@/components/marketing/HowItWorks'
import Pitch from '@/components/marketing/Pitch'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const LandingPage = async () => {
  // Redirect to dashboard if user is authenticated
  const user = await getSession()
  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24  px-8 pb-32 md:px-24">
      <Hero />
      <Pitch />
      <HowItWorks />
    </main>
  )
}

export default LandingPage
