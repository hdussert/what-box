'use client'

import { SidebarNavItem } from '@/components/sidebar/SidebarNavItem'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { Download } from 'lucide-react'

/** Sidebar entry installing the app, shown only while the browser allows it. */
const InstallAppButton = () => {
  const { canInstall, install } = useInstallPrompt()
  if (!canInstall) {
    return null
  }

  return (
    <SidebarNavItem name="Install app" icon={<Download />} onClick={install} />
  )
}

export default InstallAppButton
