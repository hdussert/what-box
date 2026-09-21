import EditableImage from '@/components/images/EditableImage'
import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import ItemDetails from '@/components/items/ItemDetails'
import UpdateItemForm from '@/components/items/UpdateItemForm'
import ToolbarButton from '@/components/ToolbarButton'
import { Card, CardDescription } from '@/components/ui/card'
import { Item } from '@/db/schema'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type ItemCardProps = {
  item: Item
  isSelected: boolean
  isFocused: boolean
}

const ItemCard = ({ item, isSelected, isFocused }: ItemCardProps) => {
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!isFocused) {
      setIsEditing(false)
    }
  }, [isFocused])

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSuccess = () => {
    setIsEditing(false)
  }

  return (
    <Card
      className={cn(
        'p-0 flex-1 flex-row gap-2 hover:brightness-120 transition relative',
        isSelected && 'ring-2 ring-primary',
      )}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation()
        }
      }}
    >
      <div
        onClick={(e) => {
          if (isFocused) {
            e.stopPropagation()
          }
        }}
      >
        <EditableImage
          itemId={item.id}
          boxId={item.boxId}
          imageUrl={item.imageUrl}
          isEditing={isEditing}
          isInputDisabled={!isFocused}
          className={cn('relative size-20 transition-all', {
            'size-40': isFocused,
          })}
        />
      </div>

      <div className="flex flex-1 p-2">
        {isEditing ? (
          <UpdateItemForm
            item={item}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        ) : (
          <ItemDetails item={item} isFocused={isFocused} />
        )}

        <CardDescription className="text-xs">
          {item.createdAt.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </CardDescription>

        {isFocused && !isEditing && (
          <div className="absolute bottom-2 right-2 animate-in fade-in">
            <ToolbarButton onClick={handleEdit}>Edit</ToolbarButton>

            <DeleteItemsButton itemIds={[item.id]} />
          </div>
        )}
      </div>
    </Card>
  )
}

export default ItemCard
