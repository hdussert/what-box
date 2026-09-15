import BoxHeader from '@/components/boxes/BoxHeader'
import { getBoxById } from '@/lib/box'

// ==================== Main Box Page Component ====================

type BoxPageProps = {
  params: Promise<{ id: string }>
}

const BoxPage = async ({ params }: BoxPageProps) => {
  const { id } = await params
  const box = await getBoxById(id)

  return <BoxHeader box={box!} />
}

export default BoxPage
