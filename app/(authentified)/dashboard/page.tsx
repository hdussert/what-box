import BoxesList from '@/components/boxes-list'
import { Suspense } from 'react'

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
