import { cn } from '@/lib/utils'

type MarketingGlowProps = {
  /**
   * Where its center goes in its MarketingSection, with `top` and `left`
   * only (e.g. `top-0 left-full` for the top-right corner)
   */
  className?: string
}

/** A blurred spot of color behind a landing section's content. */
const MarketingGlow = ({ className }: MarketingGlowProps) => (
  <div
    aria-hidden
    className={cn(
      'pointer-events-none absolute -z-10 size-98 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-20 blur-3xl',
      className,
    )}
  />
)

export default MarketingGlow
