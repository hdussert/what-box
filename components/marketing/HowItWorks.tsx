import BoxLabel from '@/components/boxes/labels/BoxLabel'
import MarketingGlow from '@/components/marketing/MarketingGlow'
import MarketingSection from '@/components/marketing/MarketingSection'
import MarketingTitle from '@/components/marketing/MarketingTitle'
import { SAMPLE_BOX } from '@/components/marketing/const'
import { env } from '@/env'

const STEPS = [
  {
    title: 'Create a box',
    description: 'Name it, like "Kitchen" or "Winter clothes".',
  },
  {
    title: 'Add your items',
    description: 'List what goes inside, with a photo if you like.',
  },
  {
    title: 'Stick the label',
    description: 'Print its QR code and stick it on the box.',
  },
]

const HowItWorks = () => {
  return (
    <MarketingSection>
      <MarketingGlow className="top-2/3 left-5/7" />
      <MarketingTitle>How does it work?</MarketingTitle>
      <div className="flex flex-col items-center gap-12 md:flex-row">
        <ol className="flex flex-col gap-6 text-left">
          {STEPS.map(({ title, description }, index) => (
            <li key={title} className="flex items-start gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* On white paper, adding the top and left borders a printed label leaves to its neighbours */}
        <div className="w-full max-w-sm -rotate-2 border-l border-t border-black bg-white text-left shadow-lg">
          <BoxLabel
            shortId={SAMPLE_BOX.shortId}
            name={SAMPLE_BOX.name}
            url={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}
          />
        </div>
      </div>
    </MarketingSection>
  )
}

export default HowItWorks
