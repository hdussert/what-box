import { z } from 'zod'

const MAX_INT32 = 2147483647

export const CreateItemSchema = z.object({
  boxId: z.string().trim().min(1, 'Box is required'),
  name: z.string().trim().min(1, 'Name is required'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be 1 or more')
    .max(MAX_INT32, `Quantity must be ${MAX_INT32} or less`),
})

export type CreateItemData = z.infer<typeof CreateItemSchema>

export const UpdateItemSchema = z.object({
  id: z.string().trim().min(1, 'Item is required'),
  name: z.string().trim().min(1, 'Name is required'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be 1 or more')
    .max(MAX_INT32, `Quantity must be ${MAX_INT32} or less`),
})

export type UpdateItemData = z.infer<typeof UpdateItemSchema>

export const DeleteItemsSchema = z.object({
  itemIds: z.array(z.string().min(1)).min(1, 'Select at least one item'),
})

export type DeleteItemsData = z.infer<typeof DeleteItemsSchema>
