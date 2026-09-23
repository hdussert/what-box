import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const ITEM_CARD_COUNT = 6

// Mirrors ItemsSection (toolbar, item cards) so the page doesn't shift when
// the data arrives. Keep in sync when those components change.
export default function ItemsLoading() {
  return (
    <div>
      <div className="-mx-2 px-2 py-2 space-y-2 border-b">
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
          <Card key={index} className="p-0 flex-row gap-2">
            <Skeleton className="size-20" />
            <div className="flex flex-1 p-2">
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
          </Card>
        ))}
      </div>
    </div>
  )
}
