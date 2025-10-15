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

// Tables definitions
export const users = pgTable('users', {
  id: id(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: createdAt(),
})

export const boxes = pgTable('boxes', {
  id: id(),
  name: text('name').notNull(),
  items: text('items').array().notNull().default([]),
  userId: userIdRef(),
  createdAt: createdAt(),
})

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
