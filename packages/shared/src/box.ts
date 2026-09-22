import { z } from 'zod'

export const CreateBoxSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
})

export type CreateBoxData = z.infer<typeof CreateBoxSchema>

export const UpdateBoxSchema = z.object({
  id: z.string().trim().min(1, 'Box is required'),
  name: z.string().trim().min(1, 'Name is required'),
})

export type UpdateBoxData = z.infer<typeof UpdateBoxSchema>

export const DeleteBoxesSchema = z.object({
  boxIds: z.array(z.string().min(1)).min(1, 'Select at least one box'),
})

export type DeleteBoxesData = z.infer<typeof DeleteBoxesSchema>
