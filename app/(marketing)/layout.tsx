import MarketingNavbar from '@/app/components/marketing-navbar'
import { PropsWithChildren } from 'react'

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <MarketingNavbar />
      {children}
    </div>
  )
}

export default MarketingLayout
