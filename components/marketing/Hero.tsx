import SignUpButton from '@/components/marketing/SignUpButton'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { SITE_TAGLINE } from '@/lib/const'
import { Package } from 'lucide-react'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 justify-center min-h-[85svh]">
      <Package size={200} className="md:flex-382" />
      <div className="text-center md:text-left md:flex-618">
        <h1 className="text-5xl font-bold">WhatBox</h1>
        <Typography.P className="mt-4">{SITE_TAGLINE}</Typography.P>
        <Typography.P className="mt-2 max-w-md">
          Know what&apos;s in every box, whether you&apos;re moving house,
          filling a storage unit or clearing the garage.
        </Typography.P>
        <div className="flex gap-2 mt-6 w-full justify-center md:justify-end">
          <Button asChild variant="link">
            <a href="#why">Learn more</a>
          </Button>
          <SignUpButton />
        </div>
      </div>
    </div>
  )
}

export default Hero
