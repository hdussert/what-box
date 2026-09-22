import { getBoxById } from '@/lib/box'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

type BoxLayoutProps = {
  items: ReactNode
  children: ReactNode
  params: Promise<{ boxId: string }>
}

export default async function BoxLayout({
  children,
  items,
  params,
}: BoxLayoutProps) {
  const { boxId } = await params
  const box = await getBoxById(boxId)

  if (!box) {
    notFound()
  }

  return (
    <>
      {children}
      {items}
    </>
  )
}
