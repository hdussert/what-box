'use client'

import { newBox, NewBoxState } from '@/actions/boxes/new-box'
import ImageInput from '@/components/images/ImageInput'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

type NewBoxFormProps = {
  onSuccess: (boxId: string) => void
  className?: string
}

const NewBoxForm = ({ onSuccess, className }: NewBoxFormProps) => {
  // Use useActionState hook for the form submission action
  const initialState: NewBoxState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      name: '',
    },
  }
  const [image, setImage] = useState<File>()

  const [state, formAction, isPending] = useActionState<NewBoxState, FormData>(
    (prevState, formData) => newBox(prevState, formData, image),
    initialState,
  )

  useEffect(() => {
    if (!state.message) return

    // Box created
    if (state.success) {
      toast.success(state.message)
      setImage(undefined)

      onSuccess(state.result!.id)
    } else {
      toast.error(state.message)
    }
  }, [state, state.success, state.message])

  return (
    <form action={formAction} className={cn('flex flex-col gap-3', className)}>
      <div className="flex gap-3 items-center">
        <ImageInput
          label="Image"
          description="(Optional)"
          image={image}
          setImage={setImage}
          className="flex-1"
        />
        <FieldGroup className="flex-2">
          {state?.message && !state.success && (
            <FieldError>{state.message}</FieldError>
          )}
          <Field>
            <FieldLabel>Name*</FieldLabel>
            <Input
              type="text"
              name="name"
              placeholder="Bedroom, Kitchen..."
              disabled={isPending}
              defaultValue={state.values.name}
            />
            <FieldError>{state.errors?.name}</FieldError>
          </Field>
        </FieldGroup>
      </div>
      <Button type="submit" className="self-end" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}
export default NewBoxForm
