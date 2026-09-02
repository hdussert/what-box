import { useBoxesContext } from '@/app/components/box/table/BoxesContext'
import { Button } from '@/components/ui/button'

const SelectionMode = () => {
  const { quitSelectionMode, selectedIds, setSelectedIds } = useBoxesContext()
  const clearSelection = () => setSelectedIds([])

  return (
    <>
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        Selected: {selectedIds.length}
      </p>
      <div className="ring ring-input rounded-lg flex items-center p-0.5">
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          Clear
        </Button>
        <Button variant="ghost" size="sm" onClick={quitSelectionMode}>
          Done
        </Button>
      </div>
    </>
  )
}

export default SelectionMode
