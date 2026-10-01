import EditableImage from '@/components/images/EditableImage'
import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import ItemCardLayout from '@/components/items/ItemCardLayout'
import ItemDetails from '@/components/items/ItemDetails'
import UpdateItemForm from '@/components/items/UpdateItemForm'
import ToolbarButton from '@/components/ToolbarButton'
import { Item } from '@/db/schema'
import { cn } from 'cn'

type ItemCardProps = {
  item: Item
  isSelected: boolean
  isFocused: boolean
  isEditing: boolean
  onEdit: () => void
  onEditEnd: () => void
}

const ItemCard = ({
  item,
  isSelected,
  isFocused,
  isEditing,
  onEdit,
  onEditEnd,
}: ItemCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <ItemCardLayout
      className={cn(
        'cursor-pointer transition hover:bg-muted',
        isSelected && 'ring-2 ring-primary',
      )}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation()
        }
      }}
      image={
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
            isInputDisabled={!isFocused}
            className={cn('relative size-20 transition-all', {
              'size-40': isFocused,
            })}
          />
        </div>
      }
      details={
        isEditing ? (
          <UpdateItemForm
            item={item}
            onCancel={onEditEnd}
            onSuccess={onEditEnd}
          />
        ) : (
          <ItemDetails item={item} isFocused={isFocused} />
        )
      }
      date={
        <time
          dateTime={item.createdAt.toISOString()}
          className="text-xs text-muted-foreground"
        >
          {item.createdAt.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </time>
      }
      actions={
        isFocused && !isEditing ? (
          <div className="absolute bottom-1 right-1 animate-in fade-in">
            <ToolbarButton onClick={handleEdit} className="hover:bg-input/50">
              Edit
            </ToolbarButton>

            <DeleteItemsButton
              itemIds={[item.id]}
              className="hover:bg-input/50"
            />
          </div>
        ) : null
      }
    />
  )
}

export default ItemCard
