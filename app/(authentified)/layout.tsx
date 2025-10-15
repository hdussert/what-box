import { Side } from '@/components/side'
import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <Side />
      <div className="p-8 w-full">{children}</div>
    </div>
  )
}

export default DashboardLayout
