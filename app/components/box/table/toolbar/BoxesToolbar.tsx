'use client'

import NewBoxButton from '@/app/components/box/new/NewBoxButton'
import { useBoxesContext } from '@/app/components/box/table/BoxesContext'
import BoxesSortInput from '@/app/components/box/table/toolbar/BoxesSortInput'
import SelectionMode from '@/app/components/box/table/toolbar/SelectionMode'
import { Button } from '@/components/ui/button'

const BoxesToolbar = () => {
  const { isSelecting, enterSelectionMode } = useBoxesContext()
  return (
    <div className="flex flex-row justify-between items-center">
      <BoxesSortInput />

      {isSelecting ? (
        <SelectionMode />
      ) : (
        <div className="flex items-center gap-2">
          <NewBoxButton variant="ghost" size="sm" />
          <Button variant="ghost" size="sm" onClick={enterSelectionMode}>
            Select
          </Button>
        </div>
      )}
    </div>
  )
}

export default BoxesToolbar
