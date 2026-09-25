import { DialogProvider } from '@/components/dialog/DialogProvider'
import Side from '@/components/sidebar/Side'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getCurrentUser } from '@/lib/user'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

// Private pages: signed-in content, never indexed
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const AppLayout = async ({ children }: PropsWithChildren) => {
  const user = await getCurrentUser()

  return (
    <SidebarProvider>
      <DialogProvider>
        <Side email={user.email} />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 md:px-6">
            <SidebarTrigger />
          </header>
          <main className="flex flex-1 flex-col max-w-3xl w-full mx-auto gap-4 p-2 sm:p-6">
            {children}
          </main>
        </SidebarInset>
      </DialogProvider>
    </SidebarProvider>
  )
}

export default AppLayout
