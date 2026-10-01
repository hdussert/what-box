import { Item, ItemContent } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

/** `BoxCard`'s loading placeholder: keep its layout in sync with the card. */
const BoxCardSkeleton = () => (
  <Item variant="muted" className="p-1 gap-2 flex-nowrap min-w-0">
    <Skeleton className="aspect-square w-24 shrink-0" />
    <ItemContent className="min-w-0 p-1 self-stretch gap-1 justify-around">
      <div className="flex flex-col gap-1">
        <div className="flex h-6 items-center">
          <Skeleton className="h-5 w-2/5" />
        </div>
        <div className="flex h-5 items-center">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex h-5 items-center">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </ItemContent>
    <div className="flex flex-col self-stretch items-end">
      <Skeleton className="h-4 w-10" />
    </div>
  </Item>
)

export default BoxCardSkeleton
