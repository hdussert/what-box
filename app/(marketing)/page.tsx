import MarketingHero from '@/app/components/marketing-hero'
import MarketingHowTo from '@/app/components/marketing-how-to'
import MarketingStory from '@/app/components/marketing-story'

const MarketingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24  px-8 pb-32 md:px-24">
      <MarketingHero />
      <MarketingStory />
      <MarketingHowTo />
    </main>
  )
}

export default MarketingPage
