import Footer from '@/components/Footer'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
