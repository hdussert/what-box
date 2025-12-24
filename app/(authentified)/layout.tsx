import { NewBoxModalProvider } from '@/app/components/providers/NewBoxModalProvider'
import Side from '@/app/components/side/Side'
import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <NewBoxModalProvider>
      <div className="flex h-screen">
        <Side />
        <div className="p-8 w-full">{children}</div>
      </div>
    </NewBoxModalProvider>
  )
}

export default DashboardLayout
