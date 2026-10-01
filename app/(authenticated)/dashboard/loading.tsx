import BoxCardSkeleton from '@/components/boxes/BoxCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const BOX_CARD_COUNT = 6

// Mirrors BoxesSection's header and toolbar so the page doesn't shift when the
// data arrives. Keep in sync when those components change.
export default function DashboardLoading() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="pb-2">
        <Typography.H1 className="mb-2">My boxes</Typography.H1>
        <div className="flex h-8 items-center">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="flex flex-col gap-2 shadow-xl bg-background -mx-2 p-2 border-b">
        <div className="flex gap-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-36" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        {Array.from({ length: BOX_CARD_COUNT }).map((_, index) => (
          <BoxCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
