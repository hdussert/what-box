'use client'
import ToolbarButton from '@/components/ToolbarButton'
import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type BoxHeaderToolbarProps = {
  boxId: string
}
const BoxHeaderToolbar = ({ boxId }: BoxHeaderToolbarProps) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between">
      <ToolbarButton onClick={() => router.replace('/dashboard')} size="icon">
        <ArrowLeft size={48} />
      </ToolbarButton>
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
