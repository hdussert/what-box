import Typography from '@/components/ui/typography'
type BoxesHeaderProps = {
  total: number
}
const BoxesHeader = ({ total }: BoxesHeaderProps) => {
  return (
    <div className="p-4">
      <Typography.H1 className="mb-2">My boxes</Typography.H1>
      <p className="text-muted-foreground">{total} boxes</p>
    </div>
  )
}

export default BoxesHeader
