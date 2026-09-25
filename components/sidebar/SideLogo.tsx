'use client'

import Logo from '@/components/Logo'
import { useSidebar } from '@/components/ui/sidebar'

/** The logo in the sidebar header, closing the mobile sidebar once clicked. */
const SideLogo = () => {
  const { setOpenMobile } = useSidebar()

  return (
    <Logo
      className="px-1 text-lg"
      iconSize={24}
      onClick={() => setOpenMobile(false)}
    />
  )
}

export default SideLogo
