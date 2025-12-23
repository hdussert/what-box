import Navbar from '@/app/components/marketing/Navbar'
import { PropsWithChildren } from 'react'

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default MarketingLayout
