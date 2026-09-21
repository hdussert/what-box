import BoxLabel from '@/components/boxes/labels/BoxLabel'
import { BoxWithRelations } from '@/lib/box'

type BoxLabelsSheetProps = {
  boxes: BoxWithRelations[]
}

const BoxLabelsSheet = ({ boxes }: BoxLabelsSheetProps) => {
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
          <BoxLabel
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
