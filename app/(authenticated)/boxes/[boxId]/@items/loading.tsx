import ItemCardSkeleton from '@/components/items/ItemCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const ITEM_CARD_COUNT = 6

// Mirrors ItemsSection's toolbar so the page doesn't shift when the data
// arrives. Keep in sync when that component changes.
export default function ItemsLoading() {
  return (
    <div>
      <div className="shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
        <div className="flex gap-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      <div className="flex gap-2 flex-col py-2">
        {Array.from({ length: ITEM_CARD_COUNT }).map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
