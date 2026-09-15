import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full flex border-b-2 px-4 py-2 sticky top-0 bg-background ">
      <Link href="/" className="font-bold text-lg flex items-center gap-2">
        <Package size={32} />
        WhatBox
      </Link>
      <div className="ml-auto flex gap-4">
        <Button asChild variant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
