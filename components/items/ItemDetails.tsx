import { ItemDescription, ItemTitle } from '@/components/ui/item'
import { Item } from '@/db/schema'
import { cn } from 'cn'

type ItemDetailsProps = {
  item: Item
  isFocused: boolean
}
const ItemDetails = ({ item, isFocused }: ItemDetailsProps) => (
  <div className="flex flex-col flex-1 my-auto gap-1">
    <ItemTitle
      className={cn(
        'block w-full truncate text-base font-semibold transition-all h-9 py-1 leading-6',
        isFocused && 'px-3',
      )}
    >
      {item.name}
    </ItemTitle>

    <ItemDescription
      className={cn(
        'transition-all text-base',
        isFocused && 'px-3 py-1 leading-6',
      )}
    >
      {item.quantity}
    </ItemDescription>
  </div>
)

export default ItemDetails
