'use client'

import { useNewBoxModal } from '@/app/components/providers/NewBoxModalProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const BoxesTableEmpty = () => {
  const { openModal: openNewBoxModal } = useNewBoxModal()

  return (
    <Card className="text-center">
      <CardHeader>No boxes found.</CardHeader>
      <CardContent>
        <Button className="mx-auto" onClick={openNewBoxModal}>
          Create a Box
        </Button>
      </CardContent>
    </Card>
  )
}

export default BoxesTableEmpty
