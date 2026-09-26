import HeroScene from '@/components/marketing/HeroScene'
import SignUpButton from '@/components/marketing/SignUpButton'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

const Hero = () => {
  return (
    <div className="mt-20 flex min-h-[85svh] flex-col items-center justify-center gap-12 md:flex-row">
      <div className="text-center md:flex-618 md:text-left">
        <h1 className="text-4xl font-bold text-balance md:text-5xl">
          Know what&apos;s in every box
        </h1>
        <Typography.P className="mt-4 max-w-md text-lg">
          Moving house, filling a storage unit or clearing the garage? List what
          goes in each box, stick on a QR label, and find anything in seconds.
        </Typography.P>
        <div className="mt-8 flex justify-center gap-2 md:justify-start">
          <SignUpButton size="lg" />
          <Button asChild variant="link" size="lg">
            <a href="#why">Learn more</a>
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center md:flex-382">
        <HeroScene />
      </div>
    </div>
  )
}

export default Hero
