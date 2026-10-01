import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading placeholder for `BoxesToolbar` and `ItemsToolbar`: search and sort,
 * then Add and Select. Keep it in sync with them.
 */
const ListToolbarSkeleton = () => (
  <div className="flex flex-col gap-2 shadow-xl bg-background -mx-2 p-2 border-b">
    <div className="flex gap-1">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 w-36" />
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
)

export default ListToolbarSkeleton
