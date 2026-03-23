import Typography from '@/components/ui/typography'
import { Box } from '@/db/schema'
import { getUserBoxById } from '@/lib/box'

type BoxPageProps = {
  params: Promise<{ id: string }>
}

// ==================== Header Component ====================

type HeaderProps = {
  box: Box
}

const Header = ({ box }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography.P className="uppercase font-bold text-muted-foreground text-sm font-jb">
        Box {box.shortId}
      </Typography.P>
      <Typography.H2 className="uppercase">{box.name}</Typography.H2>
    </div>
  )
}

// ==================== Main Box Page Component ====================

const BoxPage = async ({ params }: BoxPageProps) => {
  const { id } = await params
  const box = await getUserBoxById(id)

  return (
    <div className="flex flex-col gap-4">
      <Header box={box!} />
    </div>
  )
}

export default BoxPage
