import { getBoxById } from '@/lib/box'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

type LayoutProps = {
  items: ReactNode
  children: ReactNode
  params: Promise<{ id: string }>
}

export default async function Layout({ children, items, params }: LayoutProps) {
  const { id } = await params
  const box = await getBoxById(id)

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
