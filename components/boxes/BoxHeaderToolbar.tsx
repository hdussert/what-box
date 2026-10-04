'use client'
import ToolbarButton from '@/components/ToolbarButton'
import DeleteBoxesButton from '@/components/boxes/DeleteBoxesButton'
import { usePrintLabels } from '@/components/boxes/labels/usePrintLabels'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft, Printer } from 'lucide-react'
import { useRouter } from 'next/navigation'

type BoxHeaderToolbarProps = {
  boxId: string
}
const BoxHeaderToolbar = ({ boxId }: BoxHeaderToolbarProps) => {
  const router = useRouter()
  const { print, isPending, sheet } = usePrintLabels()
  return (
    <div className="flex items-center justify-between">
      <ToolbarButton onClick={() => router.replace('/dashboard')} size="icon">
        <ArrowLeft />
      </ToolbarButton>
      <div>
        <ToolbarButton onClick={() => print([boxId])} disabled={isPending}>
          {isPending ? <Spinner /> : <Printer />}
        </ToolbarButton>
        {sheet}
        <DeleteBoxesButton
          boxIds={[boxId]}
          onSuccess={() => router.replace('/')}
        />
      </div>
    </div>
  )
}

export default BoxHeaderToolbar
