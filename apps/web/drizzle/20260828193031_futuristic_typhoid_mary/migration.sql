CREATE TABLE "box_images" (
	"id" text PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"box_id" text NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "boxes" (
	"id" text PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"short_id" text,
	"name" text NOT NULL,
	"description" text,
	"label_printed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "item_images" (
	"id" text PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"item_id" text NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" text PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"box_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"token_invalid_before" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "box_images" ADD CONSTRAINT "box_images_box_id_boxes_id_fkey" FOREIGN KEY ("box_id") REFERENCES "boxes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "item_images" ADD CONSTRAINT "item_images_item_id_items_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_box_id_boxes_id_fkey" FOREIGN KEY ("box_id") REFERENCES "boxes"("id") ON DELETE CASCADE;