import { Button } from '@/components/ui/button'
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
    <Button className="justify-start w-full" asChild variant="ghost">
      <Link href={href}>
        <Icon />
        {name}
      </Link>
    </Button>
  )
}

const SideButton = ({ name, Icon, onClick }: SideButtonProps) => {
  return (
    <Button onClick={onClick} className="justify-start w-full" variant="ghost">
      <Icon />
      {name}
    </Button>
  )
}

export const SideNavItem = (props: SideNavLinkProps | SideButtonProps) => {
  if ('href' in props) {
    return <SideNavLink {...props} />
  } else {
    return <SideButton {...props} />
  }
}
