'use client'

import { newBox, NewBoxState } from '@/app/actions/new-box'
import ImageInput from '@/app/components/ImageInput'
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
    newBox,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message])

  return (
    <form action={formAction} className={cn('flex flex-col', className)}>
      <ImageInput
        name="image"
        label="Image"
        description="(Optional)"
        value={image}
        onChange={setImage}
      />
      <FieldGroup>
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
      <Button
        type="submit"
        className="mt-6 w-full md:self-end md:w-fit"
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}
export default NewBoxForm
