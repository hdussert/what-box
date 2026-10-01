import BoxCardSkeleton from '@/components/boxes/BoxCardSkeleton'
import ListToolbarSkeleton from '@/components/list/ListToolbarSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const BOX_CARD_COUNT = 6

// Mirrors BoxesHeader so the page doesn't shift when the data arrives. Keep in
// sync when it changes.
export default function DashboardLoading() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="pb-2">
        <Typography.H1 className="mb-2">My boxes</Typography.H1>
        <div className="flex h-8 items-center">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <ListToolbarSkeleton />

      <div className="flex gap-2 flex-col">
        {Array.from({ length: BOX_CARD_COUNT }).map((_, index) => (
          <BoxCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
