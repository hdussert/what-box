import { THEME_COLOR } from '@/lib/const'
import { Package } from 'lucide-react'
import { ImageResponse } from 'next/og'

type AppIconOptions = {
  /** Width and height of the square PNG, in pixels */
  size: number
  /** Share of the width the logo spans */
  logoScale?: number
}

const DEFAULT_LOGO_SCALE = 2 / 3

/** The app logo as an opaque square PNG, for home-screen and install icons. */
export const renderAppIcon = ({
  size,
  logoScale = DEFAULT_LOGO_SCALE,
}: AppIconOptions) => {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: THEME_COLOR,
      }}
    >
      <Package size={size * logoScale} color="#fafafa" strokeWidth={1.75} />
    </div>,
    { width: size, height: size },
  )
}
