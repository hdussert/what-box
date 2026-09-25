'use client'

import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import { ReactNode } from 'react'

type SidebarNavItemProps = {
  name: string
  icon: ReactNode
  /** Renders a link when set, a button otherwise */
  href?: string
  onClick?: () => void
}

/** A sidebar menu entry that closes the mobile sidebar once clicked. */
export const SidebarNavItem = ({
  name,
  icon,
  href,
  onClick,
}: SidebarNavItemProps) => {
  const { setOpenMobile } = useSidebar()

  const handleClick = () => {
    onClick?.()
    setOpenMobile(false)
  }

  return (
    <SidebarMenuButton
      asChild={Boolean(href)}
      tooltip={name}
      className="cursor-pointer whitespace-nowrap"
      onClick={handleClick}
    >
      {href ? (
        <Link href={href}>
          {icon}
          {name}
        </Link>
      ) : (
        <>
          {icon}
          {name}
        </>
      )}
    </SidebarMenuButton>
  )
}
