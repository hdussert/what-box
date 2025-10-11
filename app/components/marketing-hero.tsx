import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import Link from 'next/link'

const MarketingHero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 justify-center h-[60vh]">
      <Package size={200} />
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-bold">WhatBox</h1>
        <p className="mt-4 text-lg text-default-500">
          Find your items in an instant.
        </p>
        <div className="flex gap-2 mt-4 w-full justify-center md:justify-end">
          <Button variant="link">
            <a href="#features">Learn more</a>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MarketingHero
