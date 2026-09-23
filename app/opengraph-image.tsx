import { SITE_NAME, SITE_TAGLINE } from '@/lib/const'
import { Package } from 'lucide-react'
import { ImageResponse } from 'next/og'

// Link-preview card for every page (they inherit it from the root)
export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
      }}
    >
      <Package size={220} color="#fafafa" strokeWidth={1.5} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 112, fontWeight: 700 }}>{SITE_NAME}</div>
        <div style={{ fontSize: 44, color: '#a1a1aa' }}>{SITE_TAGLINE}</div>
      </div>
    </div>,
    size,
  )
}
