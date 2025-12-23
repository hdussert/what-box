'use client'

import { ActionResponse } from '@/app/actions/response-type'
import { signUp, SignUpData } from '@/app/actions/sign-up'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { toast } from 'sonner'

type SignUpState = ActionResponse & { data: SignUpData }

const initialState: SignUpState = {
  success: false,
  message: '',
  errors: undefined,
  data: {
    email: '',
    password: '',
    confirmPassword: '',
  },
}

export default function SignUpForm() {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    async (_: SignUpState, formData: FormData) => {
      // Extract data from form
      const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      }

      try {
        const result = await signUp(data)

        // Handle successful submission
        if (result.success) {
          toast.success('Account created successfully')
          router.push('/dashboard')
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
    <form action={formAction} className="space-y-6">
      {state?.message && !state.success && (
        <FieldError>{state.message}</FieldError>
      )}

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          autoComplete="email"
          required
          disabled={isPending}
          defaultValue={state.data.email}
        />
        <FieldError>{state?.errors?.email && state.errors.email[0]}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
          defaultValue={state.data.password}
        />
        <FieldError>
          {state?.errors?.password && state.errors.password[0]}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
          defaultValue={state.data.confirmPassword}
        />
        <FieldError>
          {state?.errors?.confirmPassword && state.errors.confirmPassword[0]}
        </FieldError>
      </Field>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        Sign up
      </Button>
    </form>
  )
}
