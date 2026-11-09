import { renderAppIcon } from '@/lib/app-icon'

// iOS home-screen icon: it doesn't use SVG icons, and needs an opaque PNG
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return renderAppIcon({ size: size.width })
}
