'use client'
import GoBackButton from '@/components/GoBackButton'
import { DeleteBoxesDialog } from '@/components/boxes/DeleteBoxesDialog'
import LabelsPrintButton from '@/components/boxes/labels/LabelsPrintButton'
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
        <LabelsPrintButton boxIds={[boxId]} />
        <DeleteBoxesDialog
          boxesIds={[boxId]}
          successCallback={() => router.replace('/')}
        />
      </div>
    </div>
  )
}

export default BoxHeaderToolbar
