import { useBoxesPageContext } from '@/app/components/box/dashboard/context/BoxesPageContext'
import Typography from '@/components/ui/typography'

const BoxesHeader = () => {
  const { total } = useBoxesPageContext()
  return (
    <div className="p-4">
      <Typography.H1 className="mb-2">My boxes</Typography.H1>
      <p className="text-muted-foreground">{total} boxes</p>
    </div>
  )
}

export default BoxesHeader
