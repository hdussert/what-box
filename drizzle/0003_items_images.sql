ALTER TABLE "items" DROP CONSTRAINT "items_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "boxes" ADD COLUMN "short_id" text;--> statement-breakpoint
ALTER TABLE "boxes" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "condition" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "quantity" text NOT NULL;--> statement-breakpoint
ALTER TABLE "boxes" DROP COLUMN "items";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "image_id";