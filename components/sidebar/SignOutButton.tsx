'use client'

import { signOutAction } from '@/actions/auth/sign-out'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { LogOut } from 'lucide-react'

/** Sidebar button signing the user out. */
const SignOutButton = () => (
  <SidebarMenuButton
    className="hover:cursor-pointer whitespace-nowrap"
    onClick={() => signOutAction()}
    tooltip={'Sign out'}
  >
    <LogOut />
    Sign out
  </SidebarMenuButton>
)

export default SignOutButton
