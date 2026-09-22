import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type SignInData = z.infer<typeof SignInSchema>
