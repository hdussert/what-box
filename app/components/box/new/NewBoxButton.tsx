'use client'

import { useNewBoxModal } from '@/app/components/box/new/NewBoxModalProvider'
import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { PackagePlus } from 'lucide-react'

type NewBoxButtonProps = { label?: string } & VariantProps<
  typeof buttonVariants
>

const NewBoxButton = (props: NewBoxButtonProps) => {
  const { openModal } = useNewBoxModal()
  return (
    <Button onClick={openModal} {...props}>
      <PackagePlus />
      New Box
    </Button>
  )
}
export default NewBoxButton
