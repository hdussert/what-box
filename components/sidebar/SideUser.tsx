import SideUserEmail from '@/components/sidebar/SideUserEmail'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

/** The signed-in user's info in the sidebar, streamed so it doesn't block the page. */
const SideUser = () => (
  <Suspense fallback={<Skeleton className="mx-1 h-4 w-32" />}>
    <SideUserEmail />
  </Suspense>
)

export default SideUser
