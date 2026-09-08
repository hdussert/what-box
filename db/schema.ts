import { randomUUID } from 'crypto'
import { InferSelectModel, sql } from 'drizzle-orm'
import {
  boolean,
  check,
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
  text().references(() => users.id, { onDelete: 'cascade' })

const boxIdRef = () =>
  text().references(() => boxes.id, { onDelete: 'cascade' })

const itemIdRef = () =>
  text().references(() => items.id, { onDelete: 'cascade' })

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

  userId: userIdRef().notNull(),

  shortId: text(),
  name: text().notNull(),
  labelPrinted: boolean().default(false),
})

export const items = snakeCase.table('items', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  boxId: boxIdRef().notNull(),

  name: text().notNull(),
  description: text(),
  quantity: integer(),
})

export const images = snakeCase.table(
  'images',
  {
    id: id(),
    createdAt: createdAt(),

    boxId: boxIdRef(),
    itemId: itemIdRef(),

    url: text().notNull(), // Public URL
    pathname: text().notNull(), // Storage path
  },
  (table) => [
    check(
      'image_has_exactly_one_parent',
      sql`(${table.boxId} IS NOT NULL AND ${table.itemId} IS NULL) OR (${table.itemId} IS NOT NULL AND ${table.boxId} IS NULL)`,
    ),
  ],
)

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
export type ImageRecord = InferSelectModel<typeof images>
export type Item = InferSelectModel<typeof items>
