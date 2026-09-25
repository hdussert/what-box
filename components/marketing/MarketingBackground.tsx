import { cn } from '@/lib/utils'

// Laid out in the sections' column (same max-w-3xl as MarketingSection), so
// each spot sits behind a section and only its blur glows past the edge.
// `top` is a share of the page height, so it drifts if sections change size.
const BLOBS = [
  'top-[35%] left-1/8 bg-primary',
  'top-[60%] right-0 bg-primary',
  'top-[80%] left-1/4 bg-primary',
]

/** Blurred spots of color behind the landing page's glass sections. */
const MarketingBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden cube:hidden"
  >
    <div className="relative mx-auto h-full max-w-3xl">
      {BLOBS.map((blob) => (
        <div
          key={blob}
          className={cn(
            'absolute size-98 rounded-full opacity-20 md:size-148 blur-3xl',
            blob,
          )}
        />
      ))}
    </div>
  </div>
)

export default MarketingBackground
