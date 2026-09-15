import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import { ComponentType } from 'react'

type SideNavLinkProps = {
  name: string
  Icon: ComponentType
  href: string
  onClick?: () => void
}

type SideButtonProps = {
  name: string
  Icon: ComponentType
  onClick?: () => void
}

export type SideNavItemProps = SideNavLinkProps | SideButtonProps

const SideNavLink = ({ name, Icon, href, onClick }: SideNavLinkProps) => {
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
  const { toggleSidebar, isMobile } = useSidebar()
  const handleClick = () => {
    props.onClick?.()
    if (isMobile) toggleSidebar()
  }
  if ('href' in props) {
    return <SideNavLink {...props} onClick={handleClick} />
  } else {
    return <SideButton {...props} onClick={handleClick} />
  }
}
