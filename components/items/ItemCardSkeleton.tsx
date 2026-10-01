import { Item } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

/** `ItemCard`'s loading placeholder: keep its layout in sync with the card. */
const ItemCardSkeleton = () => (
  <Item variant="muted" className="p-1 gap-2 flex-nowrap items-stretch">
    <Skeleton className="size-20" />
    <div className="flex flex-1 p-1">
      <div className="flex flex-col flex-1 my-auto gap-1">
        <div className="h-9 py-1.5">
          <Skeleton className="h-6 w-2/5" />
        </div>
        <div className="h-6 py-0.5">
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  </Item>
)

export default ItemCardSkeleton
