import { SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
import { ComponentType } from 'react'

type SideNavLinkProps = {
  name: string
  Icon: ComponentType
  href: string
}

type SideButtonProps = {
  name: string
  Icon: ComponentType
  onClick: () => void
}

export type SideNavItemProps = SideNavLinkProps | SideButtonProps

const SideNavLink = ({ name, Icon, href }: SideNavLinkProps) => {
  return (
    <SidebarMenuButton asChild tooltip={name} className="whitespace-nowrap">
      <Link href={href}>
        <Icon />
        {name}
      </Link>
    </SidebarMenuButton>
  )
}

const SideButton = ({ name, Icon, onClick }: SideButtonProps) => {
  return (
    <SidebarMenuButton
      className="hover:cursor-pointer whitespace-nowrap"
      onClick={onClick}
      tooltip={name}
    >
      <Icon />
      {name}
    </SidebarMenuButton>
  )
}

export const SideNavItem = (props: SideNavLinkProps | SideButtonProps) => {
  if ('href' in props) {
    return <SideNavLink {...props} />
  } else {
    return <SideButton {...props} />
  }
}
