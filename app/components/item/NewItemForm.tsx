'use client'

import { newItem, NewItemState } from '@/app/actions/new-item'
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
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type NewItemFormProps = {
  boxId: string
  className?: string
}

const NewItemForm = ({ boxId, className }: NewItemFormProps) => {
  const initialState: NewItemState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      boxId,
      name: '',
      description: '',
      quantity: 1,
    },
  }
  const [image, setImage] = useState<File>()
  const [state, formAction, isPending] = useActionState<NewItemState, FormData>(
    (prevState, formData) => newItem(prevState, formData, image),
    initialState,
  )

  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      setImage(undefined)
      nameInputRef.current?.focus()
    } else {
      toast.error(state.message)
    }
  }, [state, state.success, state.message])

  return (
    <form action={formAction} className={cn('flex gap-3', className)}>
      <input type="hidden" name="boxId" value={boxId} />

      <ImageInput
        label="Image"
        description="(Optional)"
        value={image}
        onChange={setImage}
      />

      <div className="flex-1">
        <FieldGroup>
          {state.message && !state.success && (
            <FieldError>{state.message}</FieldError>
          )}

          <Field>
            <FieldLabel>Name*</FieldLabel>
            <Input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Item name..."
              disabled={isPending}
              defaultValue={state.values.name}
            />
            <FieldError>{state.errors?.name}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Quantity*</FieldLabel>
            <Input
              type="number"
              name="quantity"
              min={1}
              placeholder="1"
              disabled={isPending}
              defaultValue={state.values.quantity}
            />
            <FieldError>{state.errors?.quantity}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Input
              type="text"
              name="description"
              placeholder="Optional description..."
              disabled={isPending}
              defaultValue={state.values.description}
            />
            <FieldError>{state.errors?.description}</FieldError>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          className="mt-6 w-full md:self-end md:w-fit"
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default NewItemForm
