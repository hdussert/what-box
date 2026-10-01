import ItemCardLayout from '@/components/items/ItemCardLayout'
import { Skeleton } from '@/components/ui/skeleton'

const ItemCardSkeleton = () => (
  <ItemCardLayout
    image={<Skeleton className="size-20" />}
    details={
      <div className="flex flex-col flex-1 my-auto gap-1">
        <div className="h-9 py-1.5">
          <Skeleton className="h-6 w-2/5" />
        </div>
        <div className="h-6 py-0.5">
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
    }
    date={<Skeleton className="h-4 w-16" />}
  />
)

export default ItemCardSkeleton
