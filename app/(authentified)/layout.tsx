import { NewBoxModalProvider } from '@/app/components/box/new/NewBoxModalContext'
import Side from '@/app/components/side/Side'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <NewBoxModalProvider>
        <Side />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 md:px-6">
            <SidebarTrigger />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-2 sm:p-6">
            {children}
          </main>
        </SidebarInset>
      </NewBoxModalProvider>
    </SidebarProvider>
  )
}

export default DashboardLayout
