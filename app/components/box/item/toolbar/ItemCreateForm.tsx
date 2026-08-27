'use client'

import { createItemAction } from '@/app/actions/item-actions'
import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

type NewItemRow = {
  name: string
  quantity: string
  description: string
}

const EMPTY_ROW: NewItemRow = {
  name: '',
  quantity: '',
  description: '',
}

const ItemCreateForm = () => {
  const { boxId } = useItemTableContext()
  const [newItem, setNewItem] = useState<NewItemRow>(EMPTY_ROW)
  const [isPending, startTransition] = useTransition()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [shouldFocus, setShouldFocus] = useState(false)

  useEffect(() => {
    if (!isPending && shouldFocus) {
      nameInputRef.current?.focus()
      setShouldFocus(false)
    }
  }, [isPending, shouldFocus])

  const handleCreateItem = () => {
    const quantity = parseInt(newItem.quantity)
    const name = newItem.name.trim()

    if (!name || !quantity || quantity <= 0) {
      toast.error('Name and quantity are required')
      return
    }

    startTransition(async () => {
      const result = await createItemAction({
        boxId,
        name: name,
        quantity: quantity,
        description: newItem.description.trim() || undefined,
      })

      if (result.success) {
        toast.success('Item created')
        setNewItem(EMPTY_ROW)
        setShouldFocus(true)
      } else {
        toast.error(result.error || 'Failed to create item')
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isPending) {
      handleCreateItem()
    }
  }

  return (
    <Card className="py-2">
      <CardContent className="px-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            ref={nameInputRef}
            placeholder="Item name *"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            className="flex-2"
          />
          <Input
            placeholder="Quantity *"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            onKeyDown={handleKeyDown}
            disabled={isPending}
            className="flex-1"
            type="number"
          />

          <Input
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            onKeyDown={handleKeyDown}
            disabled={isPending}
            className="flex-2"
          />
          <Button
            onClick={handleCreateItem}
            disabled={
              isPending || !newItem.name.trim() || !newItem.quantity.trim()
            }
            size="sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add item</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ItemCreateForm
