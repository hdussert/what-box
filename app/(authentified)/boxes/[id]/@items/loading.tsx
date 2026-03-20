import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-6">
          <Skeleton className="h-8 w-4/5" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm flex-col gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="flex gap-6 items-center" key={index}>
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <Skeleton className="h-6 w-1/4" />
          <div className="flex gap-2 w-1/2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        </div>
      </CardFooter>
      <Skeleton />
    </Card>
  )
}
