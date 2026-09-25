'use client'

import { signOutAction } from '@/actions/auth/sign-out'
import NewBoxDialog from '@/components/boxes/NewBoxDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import Logo from '@/components/Logo'
import {
  SidebarNavItem,
  SidebarNavItemProps,
} from '@/components/sidebar/SidebarNavItem'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Boxes, LogOut, PackagePlus } from 'lucide-react'
import Link from 'next/link'

type SideItemList = Array<SidebarNavItemProps & { key: string }>

type SideProps = {
  email: string
}

const Side = ({ email }: SideProps) => {
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
      {/* Collapses via grid rows (1fr → 0fr) to animate its height with the sidebar width */}
      <SidebarHeader
        className={cn(
          'grid grid-rows-[1fr] whitespace-nowrap transition-[grid-template-rows,padding,opacity,visibility] duration-200 ease-linear',
          'group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:grid-rows-[0fr] group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:opacity-0',
        )}
      >
        <div className="flex min-h-0 flex-col gap-2 overflow-hidden">
          <Logo className="px-1 text-lg" iconSize={24} />
          <p
            className="truncate px-1 text-xs text-muted-foreground"
            title={email}
          >
            {email}
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarNavItem {...item} key={item.key} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          className="hover:cursor-pointer whitespace-nowrap"
          onClick={() => signOutAction()}
          tooltip={'Sign out'}
        >
          <LogOut />
          Sign out
        </SidebarMenuButton>
        <div className="px-2 pt-1 text-center text-xs text-muted-foreground whitespace-nowrap group-data-[collapsible=icon]:hidden">
          <Link href="/legal" className="hover:text-foreground">
            Legal notice
          </Link>
          {' · '}
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default Side
