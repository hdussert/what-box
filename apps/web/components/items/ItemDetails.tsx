import { CardDescription, CardTitle } from '@/components/ui/card'
import { Item } from '@/db/schema'
import { cn } from '@/lib/utils'

type ItemDetailsProps = {
  item: Item
  isFocused: boolean
}
const ItemDetails = ({ item, isFocused }: ItemDetailsProps) => (
  <div className="flex flex-col flex-1 my-auto gap-1">
    <CardTitle
      className={cn('transition-all h-9 py-1 leading-6', isFocused && 'px-3')}
    >
      {item.name}
    </CardTitle>

    <CardDescription
      className={cn(
        'transition-all text-base',
        isFocused && 'px-3 py-1 leading-6',
      )}
    >
      {item.quantity}
    </CardDescription>
  </div>
)

export default ItemDetails
