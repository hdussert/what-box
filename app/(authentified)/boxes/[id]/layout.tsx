import { getUserBoxById } from '@/lib/box'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

type LayoutProps = {
  images: ReactNode
  items: ReactNode
  children: ReactNode
  params: Promise<{ id: string }>
}

export default async function Layout({
  children,
  items,
  images,
  params,
}: LayoutProps) {
  const { id } = await params
  const box = await getUserBoxById(id)

  if (!box) {
    notFound()
  }

  return (
    <>
      {children}
      {items}
      {images}
    </>
  )
}
