DROP TABLE "images";--> statement-breakpoint
ALTER TABLE "boxes" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "boxes" ADD COLUMN "image_pathname" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "image_pathname" text;