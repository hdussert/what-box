import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="space-y-2">
      <Card>
        <CardContent className="flex gap-2">
          <Skeleton className="h-9 w-1/5" />
          <Skeleton className="h-9 w-1/5" />
          <Skeleton className="h-9 w-1/5" />
          <Skeleton className="h-9 w-1/5" />
          <Skeleton className="h-9 w-1/5" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <Skeleton className="h-9 w-96" />
            <Skeleton className="h-8 w-9.5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col gap-px pl-2 pt-px">
            <div className="flex gap-2 items-center">
              <Skeleton className="size-4.5 rounded" />
              <Skeleton className="h-10 flex-1" />
            </div>
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <Skeleton className="size-4.5 rounded" />
                <Skeleton className="h-9 flex-1" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full items-center">
            <Skeleton className="h-6 w-16" />
            <div className="flex gap-2 w-60">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
