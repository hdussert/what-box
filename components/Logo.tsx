import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'
import Link from 'next/link'

type LogoProps = {
  className?: string
  iconSize?: number
  onClick?: () => void
}

/** The WhatBox logo, linking home (`/` sends signed-in users to their dashboard). */
const Logo = ({ className, iconSize = 40, onClick }: LogoProps) => (
  <Link
    href="/"
    onClick={onClick}
    className={cn('flex items-center gap-2 font-bold text-2xl', className)}
  >
    <Package size={iconSize} />
    WhatBox
  </Link>
)

export default Logo
