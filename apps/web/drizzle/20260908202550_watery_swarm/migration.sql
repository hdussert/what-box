ALTER TABLE "images" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;