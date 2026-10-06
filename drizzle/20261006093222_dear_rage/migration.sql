CREATE TABLE "image_cleanup_queue" (
	"pathname" text PRIMARY KEY,
	"queued_at" timestamp DEFAULT now() NOT NULL
);
