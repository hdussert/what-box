import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'

const PASSWORD_FIELD_COUNT = 3

// Mirrors the settings page (password form, delete account) so it doesn't
// shift when the page arrives. Each placeholder sits in a row as tall as the
// text it stands for. Keep in sync when the page changes.
export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Typography.H1>Settings</Typography.H1>
      <section className="flex max-w-sm flex-col gap-4">
        <SectionHeaderSkeleton descriptionLineCount={2} />
        <div className="space-y-6">
          {Array.from({ length: PASSWORD_FIELD_COUNT }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex h-4.75 items-center">
                <Skeleton className="h-3.5 w-32" />
              </div>
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
    <div>
      <Skeleton className="h-6 w-40" />
      <div className="mt-2">
        {Array.from({ length: descriptionLineCount }).map((_, index) => (
          <div key={index} className="flex h-5 items-center">
            <Skeleton className="h-3.5 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
