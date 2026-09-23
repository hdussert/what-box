import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'
import Link from 'next/link'

type LogoProps = {
  className?: string
  iconSize?: number
}

/** The WhatBox logo, linking home (`/` sends signed-in users to their dashboard). */
const Logo = ({ className, iconSize = 32 }: LogoProps) => (
  <Link
    href="/"
    className={cn('flex items-center gap-2 font-bold text-lg', className)}
  >
    <Package size={iconSize} />
    WhatBox
  </Link>
)

export default Logo
