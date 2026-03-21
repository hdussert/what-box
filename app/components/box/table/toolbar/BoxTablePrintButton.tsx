'use client'

import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'
import { useBoxTableContext } from '../BoxTableProvider'

const BoxTablePrintButton = () => {
  const { selectedIds, setSelectedIds } = useBoxTableContext()

  const handlePrint = () => {
    // TODO: Implement print labels
    console.log('Print labels:', selectedIds)
  }

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={selectedIds.length === 0}
      onClick={() => {
        // TODO: Print labels implementation
        console.log('Print labels:', selectedIds)
      }}
    >
      <Printer />
    </Button>
  )
}

export default BoxTablePrintButton
