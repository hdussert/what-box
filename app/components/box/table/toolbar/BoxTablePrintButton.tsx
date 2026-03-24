'use client'

import BoxLabelsSheet from '@/app/components/box/labels/BoxLabelsSheet'
import { useBoxTableContext } from '@/app/components/box/table/BoxTableProvider'
import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

const BoxTablePrintButton = () => {
  const { selectedIds } = useBoxTableContext()
  const print = () => {
    window.print()
  }
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        disabled={selectedIds.length === 0}
        onClick={print}
      >
        <Printer />
      </Button>
      <BoxLabelsSheet />
    </>
  )
}

export default BoxTablePrintButton
