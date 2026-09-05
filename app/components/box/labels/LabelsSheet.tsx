import Label from '@/app/components/box/labels/Label'
import { Box } from '@/db/schema'

type LabelsSheet = {
  boxes: Box[]
}

const BoxLabelsSheet = ({ boxes }: LabelsSheet) => {
  // const { getSelectedBoxes } = useBoxesPageContext()
  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0cm;
          }

          body * {
            visibility: hidden;
          }

          #print-area,
          #print-area * {
            visibility: visible;
          }

          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div id="print-area" className="hidden">
        {boxes.map((box) => (
          <Label
            key={box.id}
            id={box.id}
            shortId={box.shortId}
            name={box.name}
          />
        ))}
      </div>
    </>
  )
}

export default BoxLabelsSheet
