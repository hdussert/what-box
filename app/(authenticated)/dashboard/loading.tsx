import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const BOX_CARD_COUNT = 6

// Mirrors BoxesSection (header, toolbar, box cards) so the page doesn't
// shift when the data arrives. Keep in sync when those components change.
export default function DashboardLoading() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="p-4 pb-2">
        <Typography.H1 className="mb-2">My boxes</Typography.H1>
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="-mx-2 px-2 pt-2">
        <div className="flex gap-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-36" />
        </div>
        <Separator className="mt-2 mb-1" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        {Array.from({ length: BOX_CARD_COUNT }).map((_, index) => (
          <Card
            key={index}
            className="p-0 pr-4 flex-row gap-4 items-center min-w-0"
          >
            <Skeleton className="aspect-square w-20" />
            <div className="flex flex-col flex-1 min-w-0 gap-1">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
