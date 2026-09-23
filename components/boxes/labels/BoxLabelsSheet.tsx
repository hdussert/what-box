import BoxLabel from '@/components/boxes/labels/BoxLabel'
import { BoxWithRelations } from '@/lib/box'
import { createPortal } from 'react-dom'

type BoxLabelsSheetProps = {
  boxes: BoxWithRelations[]
}

// Portaled to <body> so print styles can drop the rest of the app from the
// layout (display: none). Hiding it with visibility kept its height, which
// added a blank page, and rendering inside the sticky toolbar offset the sheet.
const BoxLabelsSheet = ({ boxes }: BoxLabelsSheetProps) => {
  return createPortal(
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0cm;
          }

          body > *:not(#print-area) {
            display: none !important;
          }

          #print-area {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
          }

          #print-area > * {
            break-inside: avoid;
          }
        }
      `}</style>

      <div id="print-area" className="hidden">
        {boxes.map((box) => (
          <BoxLabel
            key={box.id}
            id={box.id}
            shortId={box.shortId}
            name={box.name}
          />
        ))}
      </div>
    </>,
    document.body,
  )
}

export default BoxLabelsSheet
