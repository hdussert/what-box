'use client'

import { useList } from '@/components/list/ListProvider'
import Typography from '@/components/ui/typography'

type BoxesHeaderProps = {
  total: number
}

const BoxesHeader = ({ total }: BoxesHeaderProps) => {
  const { search } = useList()
  const noun = search ? 'result' : 'box'
  const plural = search ? 'results' : 'boxes'

  return (
    <div className="pb-2">
      <Typography.H1 className="mb-2">My boxes</Typography.H1>
      <p className="text-muted-foreground">
        {total} {total === 1 ? noun : plural}
      </p>
    </div>
  )
}

export default BoxesHeader
