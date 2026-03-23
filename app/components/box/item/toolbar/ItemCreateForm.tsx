'use client'

import { createItemAction } from '@/app/actions/item-actions'
import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type NewItemRow = {
  name: string
  quantity: string
  condition: string
  description: string
}

const EMPTY_ROW: NewItemRow = {
  name: '',
  quantity: '',
  condition: '',
  description: '',
}

const ItemCreateForm = () => {
  const { boxId } = useItemTableContext()
  const [newItem, setNewItem] = useState<NewItemRow>(EMPTY_ROW)
  const [isPending, startTransition] = useTransition()

  const handleCreateItem = () => {
    if (!newItem.name.trim() || !newItem.quantity.trim()) {
      toast.error('Name and quantity are required')
      return
    }

    startTransition(async () => {
      const result = await createItemAction({
        boxId,
        name: newItem.name.trim(),
        quantity: newItem.quantity.trim(),
        condition: newItem.condition.trim() || undefined,
        description: newItem.description.trim() || undefined,
      })

      if (result.success) {
        toast.success('Item created')
        setNewItem(EMPTY_ROW)
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
    <Card>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
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
          />
          <Input
            placeholder="Condition"
            value={newItem.condition}
            onChange={(e) =>
              setNewItem({ ...newItem, condition: e.target.value })
            }
            onKeyDown={handleKeyDown}
            disabled={isPending}
            className="flex-1"
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
