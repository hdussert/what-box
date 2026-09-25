import NewBoxNavItem from '@/components/sidebar/NewBoxNavItem'
import { SidebarNavItem } from '@/components/sidebar/SidebarNavItem'
import SideLogo from '@/components/sidebar/SideLogo'
import SideUser from '@/components/sidebar/SideUser'
import SignOutButton from '@/components/sidebar/SignOutButton'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Boxes, Settings } from 'lucide-react'
import Link from 'next/link'

const Side = () => {
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
          <SideLogo />
          <SideUser />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarNavItem
              name="My boxes"
              icon={<Boxes />}
              href="/dashboard"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NewBoxNavItem />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavItem name="Settings" icon={<Settings />} href="/settings" />
        <SignOutButton />
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
