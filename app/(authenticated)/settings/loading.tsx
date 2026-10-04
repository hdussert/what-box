import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const PASSWORD_FIELD_COUNT = 3

// Mirrors the settings page (password form, delete account) so it doesn't
// shift when the page arrives. Keep in sync when it changes.
export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Typography.H1>Settings</Typography.H1>
      <section className="flex max-w-sm flex-col gap-4">
        <SectionHeaderSkeleton descriptionLineCount={2} />
        <div className="space-y-6">
          {Array.from({ length: PASSWORD_FIELD_COUNT }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
          <Skeleton className="h-9 w-36" />
        </div>
      </section>
      <section className="flex max-w-sm flex-col gap-4">
        <SectionHeaderSkeleton descriptionLineCount={1} />
        <Skeleton className="h-9 w-32" />
      </section>
    </div>
  )
}

type SectionHeaderSkeletonProps = {
  descriptionLineCount: number
}

function SectionHeaderSkeleton({
  descriptionLineCount,
}: SectionHeaderSkeletonProps) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-40" />
      {Array.from({ length: descriptionLineCount }).map((_, index) => (
        <Skeleton key={index} className="h-4 w-full" />
      ))}
    </div>
  )
}
