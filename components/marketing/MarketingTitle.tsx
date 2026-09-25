import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

/** A landing page section heading. */
const MarketingTitle = ({ className, ...props }: ComponentProps<'h2'>) => (
  <h2 className={cn('text-3xl font-bold', className)} {...props} />
)

export default MarketingTitle
