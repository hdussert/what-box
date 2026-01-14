import { Box } from '@/db/schema'
import QRCode from 'react-qr-code'

type BoxLabelProps = Box

const BoxLabel = ({ name, id }: BoxLabelProps) => {
  const shortId = id.slice(0, 6).toUpperCase()
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/boxes/${id}`

  return (
    <div className="w-[420px] print:w-full">
      <div className="border-2 p-4 print:border-0 print:p-0">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold tracking-[0.25em]">
              BOX {shortId}
            </div>

            <div className="mt-2 text-2xl font-black uppercase leading-tight">
              {name}
            </div>

            <div className="mt-2 text-[11px] text-neutral-700">
              Scan to open box details
            </div>
          </div>

          <div className="shrink-0 border-2 border-black p-2">
            <QRCode value={url} size={104} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxLabel
