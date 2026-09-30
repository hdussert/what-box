import { Item, ItemContent } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const BOX_CARD_COUNT = 6

// Mirrors BoxesSection (header, toolbar, box cards) so the page doesn't
// shift when the data arrives. Keep in sync when those components change.
export default function DashboardLoading() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="pb-2">
        <Typography.H1 className="mb-2">My boxes</Typography.H1>
        <div className="flex h-8 items-center">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="shadow-xl bg-background -mx-2 p-2 border-b">
        <div className="flex gap-1">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-36" />
        </div>
        <Separator className="mt-2 mb-1" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        {Array.from({ length: BOX_CARD_COUNT }).map((_, index) => (
          <Item
            key={index}
            variant="muted"
            className="p-0 gap-2 flex-nowrap min-w-0"
          >
            <Skeleton className="aspect-square w-24 shrink-0" />
            <ItemContent className="min-w-0 p-2 self-stretch">
              <div className="flex justify-between gap-2">
                <Skeleton className="h-5.5 w-2/5" />
                <Skeleton className="h-4 w-14" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-[21px] w-3/4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="size-4" />
              </div>
            </ItemContent>
          </Item>
        ))}
      </div>
    </div>
  )
}
