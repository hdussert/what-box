'use client'

import { newBox, NewBoxData } from '@/app/actions/new-box'
import { ActionResponse } from '@/app/actions/response-type'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'
import { toast } from 'sonner'

type NewBoxState = ActionResponse & {
  data: NewBoxData
}

const initialState: NewBoxState = {
  success: false,
  message: '',
  errors: undefined,
  data: {
    name: '',
  },
}

type NewBoxFormProps = {
  onSuccess: (boxId: string) => void
}

const NewBoxForm = ({ onSuccess }: NewBoxFormProps) => {
  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<NewBoxState, FormData>(
    async (_: NewBoxState, formData: FormData) => {
      const data = {
        name: formData.get('name') as string,
      }
      try {
        const result = await newBox(data)

        // Handle successful submission
        if (result.success) {
          toast.success('Box created successfully')
          onSuccess(result.data!.id)
        } else {
          toast.error(result.message)
        }

        return {
          ...result,
          data,
        }
      } catch (err) {
        return {
          success: false,
          message: (err as Error).message || 'An error occurred',
          errors: undefined,
          data,
        }
      }
    },
    initialState
  )
  return (
    <form action={formAction}>
      <FieldGroup>
        {state?.message && !state.success && (
          <FieldError>{state.message}</FieldError>
        )}
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            type="text"
            name="name"
            placeholder="My Box"
            disabled={isPending}
            defaultValue={state.data.name}
          />
          <FieldError>{state.errors?.name}</FieldError>
        </Field>
      </FieldGroup>
      <Button type="submit" className="mt-6" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}
export default NewBoxForm
