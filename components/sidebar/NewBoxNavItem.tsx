'use client'

import NewBoxDialog from '@/components/boxes/NewBoxDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import { SidebarNavItem } from '@/components/sidebar/SidebarNavItem'
import { PackagePlus } from 'lucide-react'

/** Sidebar button opening the new box dialog. */
const NewBoxNavItem = () => {
  const { openDialog } = useDialog()

  return (
    <SidebarNavItem
      name="New box"
      icon={<PackagePlus />}
      onClick={() => openDialog(NewBoxDialog, {})}
    />
  )
}

export default NewBoxNavItem
