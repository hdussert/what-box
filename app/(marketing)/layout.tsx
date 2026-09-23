import Footer from '@/components/Footer'
import Navbar from '@/components/marketing/Navbar'
import { PropsWithChildren } from 'react'

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default MarketingLayout
