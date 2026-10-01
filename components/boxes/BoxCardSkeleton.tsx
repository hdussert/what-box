import { Item, ItemContent } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

/** `BoxCard`'s loading placeholder: keep its layout in sync with the card. */
const BoxCardSkeleton = () => (
  <Item variant="muted" className="p-1 gap-2 flex-nowrap min-w-0">
    <Skeleton className="aspect-square w-24 shrink-0" />
    <ItemContent className="min-w-0 p-1 self-stretch justify-center gap-1">
      <div className="flex h-6 items-center justify-between gap-2">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-4 w-14" />
      <div className="flex h-5 items-center justify-between gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-16" />
      </div>
    </ItemContent>
  </Item>
)

export default BoxCardSkeleton
