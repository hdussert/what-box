import Hero from '@/components/marketing/Hero'
import HowTo from '@/components/marketing/HowTo'
import Story from '@/components/marketing/Story'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const MarketingPage = async () => {
  // Redirect to dashboard if user is authenticated
  const user = await getSession()
  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24  px-8 pb-32 md:px-24">
      <Hero />
      <Story />
      <HowTo />
    </main>
  )
}

export default MarketingPage
