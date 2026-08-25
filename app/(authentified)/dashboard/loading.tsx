import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Card className="py-2 gap-2">
      <CardContent className="px-2">
        <div className="flex mb-2 gap-3">
          <Skeleton className="h-9 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
          </div>
        </div>
        <Separator />
        <div className="flex w-full flex-col gap-px pl-2">
          <div className="flex gap-2 h-10 items-center">
            <Skeleton className="size-4 border rounded" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="h-5 flex-1" />
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex gap-2 h-9 items-center" key={index}>
              <Skeleton className="size-4 border rounded" />
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="h-5 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4">
        <div className="flex justify-between w-full items-center">
          <Skeleton className="h-6 w-16" />
          <div className="flex gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
