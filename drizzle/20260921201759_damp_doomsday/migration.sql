ALTER TABLE "items" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "quantity" SET NOT NULL;