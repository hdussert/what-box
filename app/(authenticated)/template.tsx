import { PropsWithChildren, ViewTransition } from 'react'

// Remounts on every navigation, so the old page fades out and the new one (or
// its loading skeleton) fades in. default="none": updates within a page, like
// search, sort or a server action's refresh, would otherwise cross-fade too.
// Same flex as <main> in the layout, which it sits inside.
export default function AuthenticatedTemplate({ children }: PropsWithChildren) {
  return (
    <ViewTransition default="none" enter="auto" exit="auto">
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </ViewTransition>
  )
}
