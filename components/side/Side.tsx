'use client'

import { signOut } from '@/actions/auth/sign-out'
import NewBoxDialog from '@/components/boxes/new/NewBoxDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import { SideNavItem, SideNavItemProps } from '@/components/side/SideNavItem'
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
  const { openDialog } = useDialog()

  const items: SideItemList = [
    { key: 'dashboard', name: 'My boxes', Icon: Boxes, href: '/dashboard' },
    {
      key: 'new-box',
      name: 'New box',
      Icon: PackagePlus,
      onClick: () => openDialog(NewBoxDialog, {}),
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
