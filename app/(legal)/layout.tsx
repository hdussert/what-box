import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import { PropsWithChildren } from 'react'

const LegalLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 py-2">
        <Logo className="w-fit" />
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default LegalLayout
