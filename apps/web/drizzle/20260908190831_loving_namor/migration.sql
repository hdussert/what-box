ALTER TABLE "box_images" RENAME TO "images";--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_user_id_users_id_fkey";--> statement-breakpoint
DROP TABLE "item_images";--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "item_id" text;--> statement-breakpoint
ALTER TABLE "boxes" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "box_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_item_id_items_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "image_has_exactly_one_parent" CHECK (("box_id" IS NOT NULL AND "item_id" IS NULL) OR ("item_id" IS NOT NULL AND "box_id" IS NULL));