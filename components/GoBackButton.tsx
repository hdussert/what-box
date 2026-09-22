'use client'

import ToolbarButton from '@/components/ToolbarButton'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
  const router = useRouter()
  const goBack = () => {
    router.back()
  }
  return (
    <ToolbarButton onClick={goBack} size="icon">
      <ArrowLeft size={48} />
    </ToolbarButton>
  )
}

export default GoBackButton
