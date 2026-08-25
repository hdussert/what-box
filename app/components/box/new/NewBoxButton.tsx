'use client'

import { useNewBoxModal } from '@/app/components/box/new/NewBoxModalProvider'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'

const NewBoxButton = () => {
  const { openModal } = useNewBoxModal()

  return (
    <Button onClick={openModal}>
      <PackagePlus />
      New box
    </Button>
  )
}
export default NewBoxButton
