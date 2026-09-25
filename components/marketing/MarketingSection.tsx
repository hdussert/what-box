import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

/** A landing page section: a centered column below the hero. */
const MarketingSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => (
  <section
    className={cn(
      'flex w-full max-w-3xl flex-col items-center gap-8 text-center',
      className,
    )}
    {...props}
  />
)

export default MarketingSection
