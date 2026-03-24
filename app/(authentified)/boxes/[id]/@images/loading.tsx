import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center">
        <div className="mx-auto grid grid-cols-4 w-full gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
