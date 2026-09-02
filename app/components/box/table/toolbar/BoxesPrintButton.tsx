'use client'

import BoxLabelsSheet from '@/app/components/box/labels/BoxLabelsSheet'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

const BoxesPrintButton = () => {
  const print = () => {
    window.print()
  }
  return (
    <>
      <Button variant="ghost" onClick={print} size="icon">
        <Printer />
      </Button>
      <BoxLabelsSheet />
    </>
  )
}

export default BoxesPrintButton
