import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import { ComponentType } from 'react'

type SidebarNavLinkProps = {
  name: string
  Icon: ComponentType
  href: string
  onClick?: () => void
}

type SidebarNavButtonProps = {
  name: string
  Icon: ComponentType
  onClick?: () => void
}

export type SidebarNavItemProps = SidebarNavLinkProps | SidebarNavButtonProps

const SidebarNavLink = ({ name, Icon, href, onClick }: SidebarNavLinkProps) => {
  return (
    <SidebarMenuButton
      asChild
      tooltip={name}
      className="whitespace-nowrap"
      onClick={onClick}
    >
      <Link href={href}>
        <Icon />
        {name}
      </Link>
    </SidebarMenuButton>
  )
}

const SidebarNavButton = ({ name, Icon, onClick }: SidebarNavButtonProps) => {
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
