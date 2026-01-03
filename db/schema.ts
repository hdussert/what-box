import { randomUUID } from 'crypto'
import { InferSelectModel, sql } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

// Common column definitions
const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const userIdRef = () =>
  text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()

const boxIdRef = () =>
  text('box_id')
    .references(() => boxes.id, { onDelete: 'cascade' })
    .notNull()

// Tables definitions
export const users = pgTable('users', {
  id: id(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: createdAt(),
})

export const boxes = pgTable('boxes', {
  id: id(),
  shortId: text('short_id'),
  name: text('name').notNull(),
  description: text('description'),
  userId: userIdRef(),
  createdAt: createdAt(),
})

export const images = pgTable('images', {
  id: id(),
  boxId: boxIdRef(),
  userId: userIdRef(),
  url: text('url').notNull(), // Public URL
  pathname: text('pathname').notNull(), // Storage path
  createdAt: createdAt(),
})

export const items = pgTable('items', {
  id: id(),
  userId: userIdRef(),
  boxId: boxIdRef(),
  name: text('name').notNull(),
  description: text('description'),
  condition: text('condition'),
  quantity: text('quantity').notNull(),
  createdAt: createdAt(),
})

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
export type Image = InferSelectModel<typeof images>
export type Item = InferSelectModel<typeof items>
