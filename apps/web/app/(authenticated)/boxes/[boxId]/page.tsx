import BoxHeader from '@/components/boxes/BoxHeader'
import { getBoxById } from '@/lib/box'

// ==================== Main Box Page Component ====================

type BoxPageProps = {
  params: Promise<{ boxId: string }>
}

const BoxPage = async ({ params }: BoxPageProps) => {
  const { boxId } = await params
  const box = await getBoxById(boxId)

  return <BoxHeader box={box!} />
}

export default BoxPage
