import BoxCardLayout from '@/components/boxes/BoxCardLayout'
import { Skeleton } from '@/components/ui/skeleton'

const BoxCardSkeleton = () => (
  <BoxCardLayout
    image={<Skeleton className="size-full" />}
    title={<Skeleton className="h-5.5 w-2/5" />}
    date={<Skeleton className="h-4 w-14" />}
    shortId={<Skeleton className="h-4 w-14" />}
    labelStatus={<Skeleton className="size-4" />}
    summary={<Skeleton className="h-[21px] w-3/4" />}
  />
)

export default BoxCardSkeleton
