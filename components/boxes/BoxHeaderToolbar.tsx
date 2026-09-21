'use client'
import GoBackButton from '@/components/GoBackButton'
import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
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
        <PrintLabelsButton boxIds={[boxId]} />
        <DeleteBoxesButton
          boxIds={[boxId]}
          onSuccess={() => router.replace('/')}
        />
      </div>
    </div>
  )
}

export default BoxHeaderToolbar
