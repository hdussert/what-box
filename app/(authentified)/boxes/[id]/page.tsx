import Typography from '@/components/ui/typography'
import { Box } from '@/db/schema'
import { getBoxById } from '@/lib/box'

// ==================== Header Component ====================

type HeaderProps = {
  box: Box
}

const Header = ({ box }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      <Typography.P className="uppercase font-bold text-muted-foreground text-sm font-mono">
        Box {box.shortId}
      </Typography.P>
      <Typography.H2 className="uppercase">{box.name}</Typography.H2>
    </div>
  )
}

// ==================== Main Box Page Component ====================

type BoxPageProps = {
  params: Promise<{ id: string }>
}

const BoxPage = async ({ params }: BoxPageProps) => {
  const { id } = await params
  const box = await getBoxById(id)

  return <Header box={box!} />
}

export default BoxPage
