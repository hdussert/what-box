import { Separator } from '@/components/ui/separator'
import Typography from '@/components/ui/typography'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography.H2 className="uppercase">Box Not Found</Typography.H2>
        <Separator />
        <Typography.P className="text-muted-foreground">
          The box you&apos;re looking for doesn&apos;t exist or you don&apos;t
          have access to it.
        </Typography.P>
      </div>
    </div>
  )
}
