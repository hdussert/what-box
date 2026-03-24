'use client'

import { signOut } from '@/app/actions/sign-out'
import { useNewBoxModal } from '@/app/components/box/new/NewBoxModalProvider'
import {
  SideNavItem,
  SideNavItemProps,
} from '@/app/components/side/SideNavItem'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
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
        <SidebarMenuButton
          className="hover:cursor-pointer whitespace-nowrap"
          onClick={() => signOut()}
          tooltip={'Sign out'}
        >
          <LogOut />
          Sign out
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default Side
