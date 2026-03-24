import BoxLabel from '@/app/components/box/labels/BoxLabel'
import { useBoxTableContext } from '@/app/components/box/table/BoxTableProvider'

const BoxLabelsSheet = () => {
  const { getSelectedBoxes } = useBoxTableContext()
  const boxes = getSelectedBoxes()

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
