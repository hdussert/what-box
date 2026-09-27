import { z } from 'zod'

/** A new password and its confirmation: sign-up, reset and change ask both. */
export const newPasswordFields = {
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}

/** Require the confirmation to match the new password. */
export const withMatchingPasswords = <
  T extends z.ZodType<{ password: string; confirmPassword: string }>,
>(
  schema: T,
) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
