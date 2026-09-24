'use client'

import { createItemAction, CreateItemState } from '@/actions/items/create-item'
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
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type NewItemFormProps = {
  boxId: string
  className?: string
  onSuccess?: () => void
}

const NewItemForm = ({ boxId, className, onSuccess }: NewItemFormProps) => {
  const initialState: CreateItemState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      boxId,
      name: '',
      quantity: 1,
    },
  }
  const [image, setImage] = useState<File>()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const shouldFocusNameRef = useRef(false)
  const [state, formAction, isPending] = useActionState<
    CreateItemState,
    FormData
  >(
    // Handles the result here, once per submit, rather than in an effect
    async (prevState, formData) => {
      const result = await createItemAction(prevState, formData, image)
      if (result.success) {
        toast.success(result.message)
        setImage(undefined)
        shouldFocusNameRef.current = true
        onSuccess?.()
      } else {
        toast.error(result.message)
      }
      return result
    },
    initialState,
  )

  // The name input is disabled while pending, so it can only take focus
  // once the submit is over: ready for the next item
  useEffect(() => {
    if (!isPending && shouldFocusNameRef.current) {
      shouldFocusNameRef.current = false
      nameInputRef.current?.focus()
    }
  }, [isPending])

  return (
    <form action={formAction} className={cn('flex flex-col gap-3', className)}>
      <input type="hidden" name="boxId" value={boxId} />

      <div className="flex items-end gap-2">
        <ImageInput
          label="Image"
          description="(Optional)"
          image={image}
          onImageChange={setImage}
          className="flex-382"
          disabled={isPending}
          isLoading={isPending}
        />
        <FieldGroup className="flex-618">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Item name..."
              disabled={isPending}
              defaultValue={state.values.name}
              className=""
            />
            <FieldError>{state.errors?.name}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Quantity</FieldLabel>
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
        </FieldGroup>
      </div>
      <Button type="submit" disabled={isPending} className="self-end">
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}

export default NewItemForm
