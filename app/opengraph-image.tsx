import { SITE_NAME, SITE_TAGLINE } from '@/lib/const'
import { Package } from 'lucide-react'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Link-preview card for every page (they inherit it from the root)
export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Inter, the site's font (the logo uses its bold weight). ImageResponse can't
// use next/font, so these are ASCII subsets committed in assets/fonts.
const interRegular = await readFile(
  join(process.cwd(), 'assets/fonts/Inter-Regular.ttf'),
)
const interBold = await readFile(
  join(process.cwd(), 'assets/fonts/Inter-Bold.ttf'),
)

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        background: '#09090b',
        color: '#fafafa',
        fontFamily: 'Inter',
      }}
    >
      <Package size={220} color="#fafafa" strokeWidth={1.5} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 112, fontWeight: 700 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 44, fontWeight: 400, color: '#a1a1aa' }}>
          {SITE_TAGLINE}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    },
  )
}
