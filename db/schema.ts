import { randomUUID } from 'crypto'
import { InferSelectModel, isNotNull } from 'drizzle-orm'
import {
  boolean,
  index,
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

// Tables definitions
export const users = snakeCase.table('users', {
  id: id(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),

  email: text().notNull().unique(),
  password: text().notNull(),
  tokenInvalidBefore: timestamp().notNull().defaultNow(),

  // Sign-in lockout: failedLoginAttempts resets to 0 on a successful sign-in;
  // at 5 it sets lockedUntil, which sign-in checks before verifying the
  // password at all.
  failedLoginAttempts: integer().notNull().default(0),
  lockedUntil: timestamp(),
  // Cooldown between forgot-password requests for the same account.
  lastPasswordResetRequestAt: timestamp(),
})

export const boxes = snakeCase.table(
  'boxes',
  {
    id: id(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),

    userId: userIdRef().notNull(),

    shortId: text(),
    name: text().notNull(),
    labelPrinted: boolean().default(false),

    imageUrl: text(), // Public URL
    imagePathname: text(), // Storage path
  },
  // The image cleanup looks files up by pathname; most rows have none
  (table) => [
    index('boxes_image_pathname_idx')
      .on(table.imagePathname)
      .where(isNotNull(table.imagePathname)),
  ],
)

export const items = snakeCase.table(
  'items',
  {
    id: id(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),

    userId: userIdRef().notNull(),
    boxId: boxIdRef().notNull(),

    name: text().notNull(),
    quantity: integer().notNull(),

    imageUrl: text(), // Public URL
    imagePathname: text(), // Storage path
  },
  (table) => [
    index('items_image_pathname_idx')
      .on(table.imagePathname)
      .where(isNotNull(table.imagePathname)),
  ],
)

export type User = InferSelectModel<typeof users>
export type Box = InferSelectModel<typeof boxes>
export type Item = InferSelectModel<typeof items>
