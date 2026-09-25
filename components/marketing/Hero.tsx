import SignUpButton from '@/components/marketing/SignUpButton'
import { Button } from '@/components/ui/button'
import { SITE_TAGLINE } from '@/lib/const'
import { Package } from 'lucide-react'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 justify-center min-h-[85svh]">
      <Package size={200} />
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-bold">WhatBox</h1>
        <p className="mt-4 text-lg text-muted-foreground">{SITE_TAGLINE}</p>
        <p className="mt-2 max-w-md text-muted-foreground">
          Know what&apos;s in every box, whether you&apos;re moving house,
          filling a storage unit or clearing the garage.
        </p>
        <div className="flex gap-2 mt-4 w-full justify-center md:justify-end">
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
