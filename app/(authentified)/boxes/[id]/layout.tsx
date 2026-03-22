import { Separator } from '@/components/ui/separator'
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
      <Separator className="mt-2" />
      <div className="xl:flex-row flex flex-col gap-4">
        <div className="xl:w-2/3">{items}</div>
        <Separator className="xl:hidden" />
        <Separator orientation="vertical" className="xl:block hidden" />
        <div className="xl:w-1/3">{images}</div>
      </div>
    </>
  )
}
