import { Box } from '@/db/schema'
import QRCode from 'react-qr-code'

type BoxLabelProps = Pick<Box, 'id' | 'name' | 'shortId'>

const BoxLabel = ({ name, id, shortId }: BoxLabelProps) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/boxes/${id}`
  return (
    <div className="w-full border-b border-r border-black p-4 flex items-start gap-4">
      <div className="min-w-0 flex-1 flex flex-col gap-2  text-black">
        <div className="font-jb font-bold">BOX {shortId}</div>
        <div className="text-xl font-black uppercase leading-tight">{name}</div>
        <div className="text-sm text-muted-foreground">
          Scan to open box details
        </div>
      </div>
      <div className="shrink-0 border border-black p-2">
        <QRCode value={url} size={104} />
      </div>
    </div>
  )
}

export default BoxLabel
