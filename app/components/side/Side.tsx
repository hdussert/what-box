'use client'

import { signOut } from '@/app/actions/sign-out'
import { useNewBoxModal } from '@/app/components/providers/NewBoxModalProvider'
import {
  SideNavItem,
  SideNavItemProps,
} from '@/app/components/side/SideNavItem'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SideNavItem {...item} key={item.key} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => signOut()}
          className="justify-start"
          variant="ghost"
        >
          <LogOut />
          Sign out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default Side
