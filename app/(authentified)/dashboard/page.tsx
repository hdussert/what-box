import BoxTable from '@/app/components/box/table/BoxTable'
import Typography from '@/components/ui/typography'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic' // ← Force Next.js à re-render à chaque requête

type DashboardPageProps = {
  searchParams?: Promise<{ search?: string; sort?: string; page?: string }>
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const _searchParams = await searchParams
  return (
    <div>
      <Typography.H1 className="mb-6">My Boxes</Typography.H1>
      <Suspense fallback={<div>Loading...</div>}>
        <BoxTable searchParams={_searchParams} />
      </Suspense>
    </div>
  )
}
