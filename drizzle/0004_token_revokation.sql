-- Fix for "boxes" table
ALTER TABLE "boxes" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "boxes" ALTER COLUMN "created_at" SET DATA TYPE integer USING EXTRACT(epoch FROM "created_at"::timestamp)::integer;--> statement-breakpoint
ALTER TABLE "boxes" ALTER COLUMN "created_at" SET DEFAULT extract(epoch from now())::integer;--> statement-breakpoint

-- Fix for "images" table
ALTER TABLE "images" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "created_at" SET DATA TYPE integer USING EXTRACT(epoch FROM "created_at"::timestamp)::integer;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "created_at" SET DEFAULT extract(epoch from now())::integer;--> statement-breakpoint

-- Fix for "items" table
ALTER TABLE "items" ALTER COLUMN "quantity" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DATA TYPE integer USING EXTRACT(epoch FROM "created_at"::timestamp)::integer;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT extract(epoch from now())::integer;--> statement-breakpoint

-- Fix for "users" table
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE integer USING EXTRACT(epoch FROM "created_at"::timestamp)::integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT extract(epoch from now())::integer;--> statement-breakpoint

-- Remaining schema changes
ALTER TABLE "users" ADD COLUMN "token_invalid_before" integer DEFAULT extract(epoch from now())::integer NOT NULL;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "condition";