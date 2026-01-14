'use client'

import { useNewBoxModal } from '@/app/components/box/new/NewBoxModalProvider'
import { Button } from '@/components/ui/button'

const NewBoxButton = () => {
  const { openModal } = useNewBoxModal()

  return <Button onClick={openModal}>Create New Box</Button>
}
export default NewBoxButton
