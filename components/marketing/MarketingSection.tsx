import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

/** A landing page section: a centered column below the hero. */
const MarketingSection = ({
  className,
  ...props
}: ComponentProps<'section'>) => (
  <section
    className={cn(
      'flex w-full max-w-3xl flex-col items-center gap-8 rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl sm:px-10',
      className,
    )}
    {...props}
  />
)

export default MarketingSection
