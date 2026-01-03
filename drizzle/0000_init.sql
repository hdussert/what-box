CREATE TABLE "boxes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"items" text[] DEFAULT '{}' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;