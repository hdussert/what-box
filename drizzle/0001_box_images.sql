CREATE TABLE "boxes_images" (
	"id" text PRIMARY KEY NOT NULL,
	"box_id" text NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"pathname" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "boxes_images" ADD CONSTRAINT "boxes_images_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "boxes_images" ADD CONSTRAINT "boxes_images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;