import { renderAppIcon } from '@/lib/app-icon'

// Android crops maskable icons to a shape that keeps only the central 80%
// circle, so that variant gets a smaller logo
const ICON_VARIANTS = {
  '192': { size: 192 },
  '512': { size: 512 },
  maskable: { size: 512, logoScale: 1 / 2 },
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ICON_VARIANTS).map((variant) => ({ variant }))
}

/** PNG install icons listed in the web manifest (`app/manifest.ts`). */
export async function GET(
  _request: Request,
  { params }: RouteContext<'/pwa-icon/[variant]'>,
) {
  // dynamicParams = false: Next answers 404 to any other variant
  const { variant } = await params
  return renderAppIcon(ICON_VARIANTS[variant as keyof typeof ICON_VARIANTS])
}
