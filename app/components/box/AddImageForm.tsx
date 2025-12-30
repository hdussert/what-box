'use client'

import { uploadImages, UploadImageState } from '@/app/actions/upload-image'
import { ImagesInput } from '@/app/components/image-input/ImagesInput'
import { ImagesPreviews } from '@/app/components/image-input/ImagesInputPreviews'
import {
  ImagesInputProvider,
  useImagesInput,
} from '@/app/components/image-input/ImagesInputProvider'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: UploadImageState = {
  success: false,
  message: '',
  errors: undefined,
}

const AddImageForm = ({ boxId }: { boxId: string }) => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<
    UploadImageState,
    FormData
  >(uploadImages, initialState)

  const { clearAll } = useImagesInput()

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      clearAll()
      router.refresh()
    } else {
      toast.error(state.message)
      clearAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message])

  return (
    <form action={formAction}>
      <input type="hidden" name="boxId" value={boxId} />
      <Field>
        <FieldLabel>Images</FieldLabel>
        <ImagesPreviews />
        <ImagesInput name="images" multiple />
      </Field>
      {/* <ImagesPreview files={state.data.images} /> */}
      <Button type="submit" disabled={isPending} className="mt-4">
        {isPending ? (
          'Uploading...'
        ) : (
          <>
            <Upload />
            {'Upload'}
          </>
        )}
      </Button>
    </form>
  )
}

const AddImageFormWrapper = (props: { boxId: string }) => {
  return (
    <ImagesInputProvider>
      <AddImageForm boxId={props.boxId} />
    </ImagesInputProvider>
  )
}

export default AddImageFormWrapper
