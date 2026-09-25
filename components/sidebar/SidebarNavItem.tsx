'use client'

import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import { ReactNode } from 'react'

type SidebarNavLinkProps = {
  name: string
  icon: ReactNode
  href: string
  onClick?: () => void
}

type SidebarNavButtonProps = {
  name: string
  icon: ReactNode
  onClick?: () => void
}

export type SidebarNavItemProps = SidebarNavLinkProps | SidebarNavButtonProps

const SidebarNavLink = ({ name, icon, href, onClick }: SidebarNavLinkProps) => {
  return (
    <SidebarMenuButton
      asChild
      tooltip={name}
      className="whitespace-nowrap"
      onClick={onClick}
    >
      <Link href={href}>
        {icon}
        {name}
      </Link>
    </SidebarMenuButton>
  )
}

const SidebarNavButton = ({ name, icon, onClick }: SidebarNavButtonProps) => {
  return (
    <SidebarMenuButton
      className="hover:cursor-pointer whitespace-nowrap"
      onClick={onClick}
      tooltip={name}
    >
      {icon}
      {name}
    </SidebarMenuButton>
  )
}

export const SidebarNavItem = (
  props: SidebarNavLinkProps | SidebarNavButtonProps,
) => {
  const { toggleSidebar, isMobile } = useSidebar()
  const handleClick = () => {
    props.onClick?.()
    if (isMobile) toggleSidebar()
  }
  if ('href' in props) {
    return <SidebarNavLink {...props} onClick={handleClick} />
  } else {
    return <SidebarNavButton {...props} onClick={handleClick} />
  }
}
