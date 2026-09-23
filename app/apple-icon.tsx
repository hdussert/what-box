import { Package } from 'lucide-react'
import { ImageResponse } from 'next/og'

// iOS home-screen icon: it doesn't use SVG icons, and needs an opaque PNG
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
      }}
    >
      <Package size={120} color="#fafafa" strokeWidth={1.75} />
    </div>,
    size,
  )
}
