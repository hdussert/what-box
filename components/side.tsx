'use client'

import { signOut } from '@/app/actions/sign-out'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Boxes, LogOut, PackagePlus, Settings } from 'lucide-react'
import Link from 'next/link'

const links = [
  { route: '/dashboard', name: 'My boxes', icon: Boxes },
  { route: '/boxes/new', name: 'New box', icon: PackagePlus },
  {
    route: '/dashboard/settings',
    name: 'Settings',
    icon: Settings,
  },
]

const Side = () => {
  return (
    <div className="bg-sidebar border-sidebar-border h-full flex flex-col gap-2 max-w-64 border-r pt-12 px-4 ">
      <div>
        {links.map((link) => (
          <Button
            key={link.route}
            asChild
            className="justify-start w-full"
            variant="ghost"
          >
            <Link href={link.route}>
              <link.icon />
              {link.name}
            </Link>
          </Button>
        ))}
      </div>

      <Separator />
      <Button
        onClick={() => signOut()}
        className="justify-start"
        variant="ghost"
      >
        <LogOut />
        Sign out
      </Button>
    </div>
  )
}

export { Side }
