'use client'

import { usePrintLabels } from '@/components/boxes/labels/usePrintLabels'
import { useList } from '@/components/list/ListProvider'
import ToolbarButton from '@/components/ToolbarButton'
import { Spinner } from '@/components/ui/spinner'
import Typography from '@/components/ui/typography'
import { BOX_WORDS, LABEL_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'

type BoxesHeaderProps = {
  total: number
  unprintedIds: string[]
}

const BoxesHeader = ({ total, unprintedIds }: BoxesHeaderProps) => {
  const { search } = useList()
  const { print, isPending, sheet } = usePrintLabels()
  const forms = search ? { one: 'result', other: 'results' } : BOX_WORDS

  return (
    <div className="pb-2">
      <Typography.H1 className="mb-2">My boxes</Typography.H1>
      <p className="flex min-h-8 items-center text-muted-foreground">
        {pluralize(total, forms)}
        {unprintedIds.length ? (
          <>
            <span aria-hidden>,</span>
            <ToolbarButton
              variant="link"
              onClick={() => print(unprintedIds)}
              disabled={isPending}
            >
              {isPending ? (
                <Spinner />
              ) : (
                `${pluralize(unprintedIds.length, LABEL_WORDS)} to print`
              )}
            </ToolbarButton>
            {sheet}
          </>
        ) : null}
      </p>
    </div>
  )
}

export default BoxesHeader
