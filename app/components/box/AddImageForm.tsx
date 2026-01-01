'use client'

import { ImagesInput } from '@/app/components/image-input/ImagesInput'
import { ImagesPreviews } from '@/app/components/image-input/ImagesInputPreviews'
import { ImagesInputProvider } from '@/app/components/image-input/ImagesInputProvider'
import { Field } from '@/components/ui/field'

const AddImageForm = ({ boxId }: { boxId: string }) => {
  return (
    <form>
      <input type="hidden" name="boxId" value={boxId} />
      <Field>
        <ImagesInput name="images" multiple />
        <ImagesPreviews />
      </Field>
    </form>
  )
}

const AddImageFormWrapper = (props: { boxId: string }) => {
  return (
    <ImagesInputProvider boxId={props.boxId}>
      <AddImageForm boxId={props.boxId} />
    </ImagesInputProvider>
  )
}

export default AddImageFormWrapper
