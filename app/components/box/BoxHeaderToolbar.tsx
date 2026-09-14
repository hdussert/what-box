'use client'
import { DeleteBoxesDialog } from '@/app/components/box/DeleteBoxesDialog'
import PrintLabels from '@/app/components/box/labels/PrintLabels'
import GoBackButton from '@/app/components/common/GoBackButton'
import ToolbarButton from '@/app/components/common/ToolbarButton'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'

type BoxHeaderToolbarProps = {
  boxId: string
}
const BoxHeaderToolbar = ({ boxId }: BoxHeaderToolbarProps) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between">
      <GoBackButton />
      <div>
        <PrintLabels boxesIds={[boxId]} />
        <ToolbarButton>
          <Pen />
        </ToolbarButton>
        <DeleteBoxesDialog
          boxesIds={[boxId]}
          successCallback={() => router.replace('/')}
        />
      </div>
    </div>
  )
}

export default BoxHeaderToolbar
