'use client'

import ToolbarButton from '@/components/ToolbarButton'
import { useCanGoBack } from '@/components/history/useCanGoBack'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type GoBackButtonProps = {
  /** Where to go when there's no app page to go back to. */
  fallbackHref: string
}

const GoBackButton = ({ fallbackHref }: GoBackButtonProps) => {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const goBack = () => {
    if (canGoBack) {
      router.back()
      return
    }
    router.push(fallbackHref)
  }

  return (
    <ToolbarButton onClick={goBack} size="icon">
      <ArrowLeft size={48} />
    </ToolbarButton>
  )
}

export default GoBackButton
