import { NewBoxModalProvider } from '@/app/components/providers/NewBoxModalProvider'
import Side from '@/app/components/side/Side'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <NewBoxModalProvider>
        <Side />
        <main className="px-6 py-2 w-full">
          <SidebarTrigger />
          {children}
        </main>
      </NewBoxModalProvider>
    </SidebarProvider>
  )
}

export default DashboardLayout
