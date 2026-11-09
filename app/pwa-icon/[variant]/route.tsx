import { renderAppIcon } from '@/lib/app-icon'

// Android crops maskable icons to a shape that keeps only the central 80%
// circle, so that variant gets a smaller logo
const ICON_VARIANTS = {
  '192': { size: 192, logoScale: 2 / 3 },
  '512': { size: 512, logoScale: 2 / 3 },
  maskable: { size: 512, logoScale: 1 / 2 },
}

type IconVariant = keyof typeof ICON_VARIANTS

const isIconVariant = (variant: string): variant is IconVariant =>
  variant in ICON_VARIANTS

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ICON_VARIANTS).map((variant) => ({ variant }))
}

/** PNG install icons listed in the web manifest (`app/manifest.ts`). */
export async function GET(
  _request: Request,
  { params }: RouteContext<'/pwa-icon/[variant]'>,
) {
  const { variant } = await params
  if (!isIconVariant(variant)) {
    return new Response('Not found', { status: 404 })
  }

  return renderAppIcon(ICON_VARIANTS[variant])
}
