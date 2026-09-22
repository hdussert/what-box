import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type SignInData = z.infer<typeof SignInSchema>

export const SignUpSchema = z
  .object({
    email: z.email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpData = z.infer<typeof SignUpSchema>

export const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
})

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>
