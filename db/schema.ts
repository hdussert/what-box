import { randomUUID } from 'crypto'
import { InferSelectModel, sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// Common column definitions
const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  timestamp('created_at')
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
  name: text('name').notNull(),
  items: text('items').array().notNull().default([]),
  userId: userIdRef(),
  createdAt: createdAt(),
})

export const boxesImages = pgTable('boxes_images', {
  id: id(),
  boxId: boxIdRef(),
  userId: userIdRef(),
  url: text('url').notNull(), // Public URL
  pathname: text('pathname').notNull(), // Storage path
  createdAt: createdAt(),
})

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
export type BoxImage = InferSelectModel<typeof boxesImages>
