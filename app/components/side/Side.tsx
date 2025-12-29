'use client'

import { signOut } from '@/app/actions/sign-out'
import { useNewBoxModal } from '@/app/components/providers/NewBoxModalProvider'
import {
  SideNavItem,
  SideNavItemProps,
} from '@/app/components/side/SideNavItem'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Boxes, LogOut, PackagePlus } from 'lucide-react'

type SideItemList = Array<SideNavItemProps & { key: string }>

const Side = () => {
  const { openModal: openNewBoxModal } = useNewBoxModal()

  const items: SideItemList = [
    { key: 'dashboard', name: 'My boxes', Icon: Boxes, href: '/dashboard' },
    {
      key: 'new-box',
      name: 'New box',
      Icon: PackagePlus,
      onClick: openNewBoxModal,
    },
  ]
  return (
    <div className="bg-sidebar border-sidebar-border h-full flex flex-col gap-2 max-w-64 border-r pt-12 px-4 ">
      <div>
        {items.map((item) => (
          <SideNavItem {...item} key={item.key} />
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

export default Side
