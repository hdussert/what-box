import { cn } from '@/lib/utils'

type MarketingGlowProps = {
  /** Position it in its MarketingSection, e.g. `-top-16 -left-16` */
  className?: string
}

/** A blurred spot of color behind a landing section's content. */
const MarketingGlow = ({ className }: MarketingGlowProps) => (
  <div
    aria-hidden
    className={cn(
      'pointer-events-none absolute -z-10 size-98 rounded-full bg-primary opacity-20 blur-3xl md:size-148',
      className,
    )}
  />
)

export default MarketingGlow
