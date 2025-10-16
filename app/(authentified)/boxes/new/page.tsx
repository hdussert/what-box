'use client'

import { newBox } from '@/app/actions/new-box'
import { ActionResponse } from '@/app/actions/response-type'
import InputTags from '@/app/components/input-tags'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import toast from 'react-hot-toast'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

const NewBoxPage = () => {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await newBox(formData)

      // Handle successful submission
      if (result.success) {
        toast.success('Box created successfully')
        router.push('/dashboard')
        router.refresh()
      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)
  return (
    <div>
      <Typography.H1 className="mb-6">New Box</Typography.H1>
      <form action={formAction}>
        <Card>
          <CardContent>
            <FieldGroup>
              {state?.message && !state.success && (
                <FieldError>{state.message}</FieldError>
              )}
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input type="text" name="name" placeholder="My Box" />
              </Field>

              <Field>
                <FieldLabel>Items</FieldLabel>
                <FieldDescription>
                  Describe what you put in your box, you can add more later
                </FieldDescription>
                <InputTags name="items" placeholder="Item... (optional)" />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
export default NewBoxPage
