import { useBoxesContext } from '@/app/components/box/table/BoxesContext'
import Typography from '@/components/ui/typography'

const BoxesHeader = () => {
  const { total } = useBoxesContext()
  return (
    <div>
      <Typography.H1>My boxes</Typography.H1>
      <p className="text-muted-foreground">{total} boxes</p>
    </div>
  )
}

export default BoxesHeader
