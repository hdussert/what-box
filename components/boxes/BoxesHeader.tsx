'use client'

import { useList } from '@/components/list/ListProvider'
import Typography from '@/components/ui/typography'
import { BOX_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'

type BoxesHeaderProps = {
  total: number
}

const BoxesHeader = ({ total }: BoxesHeaderProps) => {
  const { search } = useList()
  const forms = search ? { one: 'result', other: 'results' } : BOX_WORDS

  return (
    <div className="pb-2">
      <Typography.H1 className="mb-2">My boxes</Typography.H1>
      <p className="text-muted-foreground">{pluralize(total, forms)}</p>
    </div>
  )
}

export default BoxesHeader
