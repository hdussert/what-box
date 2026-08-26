import { randomUUID } from 'crypto'
import { InferSelectModel } from 'drizzle-orm'
import { integer, snakeCase, text, timestamp } from 'drizzle-orm/pg-core'

// Common column definitions
const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () => timestamp('created_at').notNull().defaultNow()

const userIdRef = () =>
  text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()

const boxIdRef = () =>
  text('box_id')
    .references(() => boxes.id, { onDelete: 'cascade' })
    .notNull()

// Tables definitions
export const users = snakeCase.table('users', {
  id: id(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  tokenInvalidBefore: timestamp('token_invalid_before').notNull().defaultNow(),
  createdAt: createdAt(),
})

export const boxes = snakeCase.table('boxes', {
  id: id(),
  shortId: text('short_id'),
  name: text('name').notNull(),
  description: text('description'),
  userId: userIdRef(),
  createdAt: createdAt(),
})

export const images = snakeCase.table('images', {
  id: id(),
  boxId: boxIdRef(),
  userId: userIdRef(),
  url: text('url').notNull(), // Public URL
  pathname: text('pathname').notNull(), // Storage path
  createdAt: createdAt(),
})

export const items = snakeCase.table('items', {
  id: id(),
  userId: userIdRef(),
  boxId: boxIdRef(),
  name: text('name').notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull(),
  createdAt: createdAt(),
})

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
export type Image = InferSelectModel<typeof images>
export type Item = InferSelectModel<typeof items>
