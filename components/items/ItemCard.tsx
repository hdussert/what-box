import EditableImage from '@/components/images/EditableImage'
import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import ItemDetails from '@/components/items/ItemDetails'
import UpdateItemForm from '@/components/items/UpdateItemForm'
import ToolbarButton from '@/components/ToolbarButton'
import { Item as ItemRow } from '@/components/ui/item'
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
    <ItemRow
      variant="muted"
      className={cn(
        'p-0 flex-1 flex-nowrap items-stretch gap-2 cursor-pointer transition hover:bg-muted relative',
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
            onCancel={onEditEnd}
            onSuccess={onEditEnd}
          />
        ) : (
          <ItemDetails item={item} isFocused={isFocused} />
        )}

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

        {isFocused && !isEditing && (
          <div className="absolute bottom-2 right-2 animate-in fade-in">
            <ToolbarButton
              onClick={handleEdit}
              className="hover:bg-input/50 dark:hover:bg-input/50"
            >
              Edit
            </ToolbarButton>

            <DeleteItemsButton
              itemIds={[item.id]}
              className="hover:bg-input/50 dark:hover:bg-input/50"
            />
          </div>
        )}
      </div>
    </ItemRow>
  )
}

export default ItemCard
