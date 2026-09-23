'use client'

import { usePathname } from 'next/navigation'
import { createContext, PropsWithChildren, useState } from 'react'

export const HistoryContext = createContext(false)

/**
 * Tracks whether the user has navigated inside the app since it was opened,
 * i.e. whether `router.back()` would land on an app page. The browser can't
 * tell us: after a QR scan or a sign-in, the previous entry is outside the
 * app (or the sign-in form).
 */
const HistoryProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const [firstPathname] = useState(pathname)
  const [hasNavigated, setHasNavigated] = useState(false)

  // Adjusting state during render (not in an effect) when the path changes
  if (!hasNavigated && pathname !== firstPathname) {
    setHasNavigated(true)
  }

  return (
    <HistoryContext.Provider value={hasNavigated}>
      {children}
    </HistoryContext.Provider>
  )
}

export default HistoryProvider
