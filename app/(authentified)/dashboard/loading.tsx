import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-96" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-px pl-2 pt-2">
          {Array.from({ length: 7 }).map((_, index) => (
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
  )
}
