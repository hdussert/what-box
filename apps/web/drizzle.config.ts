import { env } from '@/env'
import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
