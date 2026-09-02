import { randomUUID } from 'crypto'
import { InferSelectModel } from 'drizzle-orm'
import {
  boolean,
  integer,
  snakeCase,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

// Common column definitions
const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () => timestamp().notNull().defaultNow()
const updatedAt = () => timestamp().notNull().defaultNow()

// Foreign keys
const userIdRef = () =>
  text()
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()

const boxIdRef = () =>
  text()
    .references(() => boxes.id, { onDelete: 'cascade' })
    .notNull()

const itemIdRef = () =>
  text()
    .references(() => items.id, { onDelete: 'cascade' })
    .notNull()

// Tables definitions
export const users = snakeCase.table('users', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  email: text().notNull().unique(),
  password: text().notNull(),
  tokenInvalidBefore: timestamp().notNull().defaultNow(),
})

export const boxes = snakeCase.table('boxes', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  userId: userIdRef(),

  shortId: text(),
  name: text().notNull(),
  labelPrinted: boolean().default(false),
})

export const boxImages = snakeCase.table('box_images', {
  id: id(),
  createdAt: createdAt(),

  boxId: boxIdRef(),

  url: text().notNull(), // Public URL
  pathname: text().notNull(), // Storage path
})

export const items = snakeCase.table('items', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  userId: userIdRef(),
  boxId: boxIdRef(),

  name: text().notNull(),
  description: text(),
  quantity: integer(),
})

export const itemImages = snakeCase.table('item_images', {
  id: id(),
  createdAt: createdAt(),

  itemId: itemIdRef(),

  url: text().notNull(), // Public URL
  pathname: text().notNull(), // Storage path
})

export type User = InferSelectModel<typeof users>

export type Box = InferSelectModel<typeof boxes>
export type BoxImage = InferSelectModel<typeof boxImages>

export type Item = InferSelectModel<typeof items>
export type ItemImage = InferSelectModel<typeof itemImages>
