import Hero from '@/app/components/marketing/Hero'
import HowTo from '@/app/components/marketing/HowTo'
import Story from '@/app/components/marketing/Story'
import { getCurrentUser } from '@/lib/user'
import { redirect } from 'next/navigation'

const MarketingPage = async () => {
  // Redirect to dashboard if user is authenticated
  const user = await getCurrentUser()
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
