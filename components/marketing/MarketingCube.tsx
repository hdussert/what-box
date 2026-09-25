'use client'

import {
  Children,
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'

// Half the face height: the cube is as deep as a face is tall
const HALF_DEPTH = '40svh'

/**
 * Turns its children into the faces of a box that tips forward, one face per
 * screen of scrolling, snapping on each face (see `cube:` in globals.css).
 * Without the `cube:` variant (small screens, reduced motion) the children
 * stay a plain column.
 */
const MarketingCube = ({ children }: PropsWithChildren) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const faces = Children.toArray(children)

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = track.getBoundingClientRect()
      const travel = height - window.innerHeight
      const ratio = travel > 0 ? Math.min(Math.max(-top / travel, 0), 1) : 0
      // 0 on the first face, faces.length - 1 on the last
      track.style.setProperty(
        '--cube-progress',
        String(ratio * (faces.length - 1)),
      )
    }
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [faces.length])

  return (
    <div
      ref={trackRef}
      data-cube-track
      style={
        {
          '--cube-faces': faces.length,
          '--cube-half-depth': HALF_DEPTH,
        } as CSSProperties
      }
      className="relative flex w-full flex-col items-center gap-24 cube:block cube:h-[calc(var(--cube-faces)*100svh)]"
    >
      {/* Snap points, one screen apart */}
      {faces.map((_, index) => (
        <div
          key={index}
          aria-hidden
          style={{ top: `${index * 100}svh` }}
          className="hidden cube:absolute cube:block cube:h-svh cube:w-full cube:snap-start"
        />
      ))}

      <div className="contents cube:sticky cube:top-0 cube:flex cube:h-svh cube:items-center cube:justify-center cube:perspective-[1200px]">
        {/* Glow behind the box, replacing MarketingBackground's spots */}
        <div
          aria-hidden
          className="hidden cube:absolute cube:block cube:size-148 cube:rounded-full cube:bg-primary cube:opacity-20 cube:blur-3xl"
        />
        <div className="contents cube:relative cube:block cube:h-[calc(var(--cube-half-depth)*2)] cube:w-full cube:max-w-3xl cube:transform-3d cube:[transform:translateZ(calc(var(--cube-half-depth)*-1))_rotateX(calc(var(--cube-progress,0)*90deg))]">
          {faces.map((face, index) => (
            <div
              key={index}
              style={{ '--face-angle': `${index * -90}deg` } as CSSProperties}
              className="contents cube:absolute cube:inset-0 cube:flex cube:rounded-xl cube:bg-background cube:backface-hidden cube:[transform:rotateX(var(--face-angle))_translateZ(var(--cube-half-depth))] cube:[&>section]:justify-center"
            >
              {face}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketingCube
