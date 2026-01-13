import BoxImages from '@/app/components/box/image/BoxImages'
import { Separator } from '@/components/ui/separator'
import Typography from '@/components/ui/typography'
import { Box } from '@/db/schema'
import { getUserBoxWithImages } from '@/lib/box'

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
      <Typography.P className="uppercase tracking-widest">
        Box {box.shortId ?? box.id.slice(0, 6)}
      </Typography.P>
      <Typography.H2 className="uppercase">{box.name}</Typography.H2>
    </div>
  )
}

// ==================== Main Box Page Component ====================

const BoxPage = async ({ params }: BoxPageProps) => {
  const { id } = await params

  const { box } = await getUserBoxWithImages(id)
  if (!box) {
    return <div>Box not found :(</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <Header box={box} />
      <Separator />
      <BoxImages boxId={box.id} />
    </div>
  )
}

export default BoxPage
