import BoxesList from '@/components/boxes-list'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

const DashboardPage = () => {
  return (
    <div>
      <div>My boxes</div>
      <Suspense fallback={<div>Loading...</div>}>
        <BoxesList />
      </Suspense>
    </div>
  )
}

export default DashboardPage
