'use client'

import { newBox, NewBoxState } from '@/app/actions/new-box'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type NewBoxFormProps = {
  onSuccess: (boxId: string) => void
}

const NewBoxForm = ({ onSuccess }: NewBoxFormProps) => {
  // Use useActionState hook for the form submission action

  const initialState: NewBoxState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      name: '',
    },
  }

  const [state, formAction, isPending] = useActionState<NewBoxState, FormData>(
    newBox,
    initialState
  )

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      onSuccess(state.result!.id)
    } else {
      toast.error(state.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.message])

  return (
    <form action={formAction} className="flex flex-col">
      <FieldGroup>
        {state?.message && !state.success && (
          <FieldError>{state.message}</FieldError>
        )}
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldDescription>
            Use a descriptive name to identify this box.
          </FieldDescription>
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
      <Button type="submit" className="mt-6 self-end" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}
export default NewBoxForm
