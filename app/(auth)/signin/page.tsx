'use client'

import { ActionResponse } from '@/app/actions/response-type'
import { signIn } from '@/app/actions/sign-in'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import toast from 'react-hot-toast'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignInPage() {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signIn(formData)

      // Handle successful submission
      if (result.success) {
        toast.success('Signed in successfully')
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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="text-center">WhatBox</Typography.H1>
        <Typography.H2 className="mt-2 text-center">
          Sign in to your account
        </Typography.H2>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state?.message && !state.success && (
              <FieldError>{state.message}</FieldError>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                disabled={isPending}
              />

              <FieldError>
                {state?.errors?.email && state.errors.email[0]}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                disabled={isPending}
              />
              <FieldError>
                {state?.errors?.password && state.errors.password[0]}
              </FieldError>
            </Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign in
            </Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?&nbsp;
            <Link href="/signup" className="font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
