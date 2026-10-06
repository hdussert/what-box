CREATE INDEX "boxes_image_pathname_idx" ON "boxes" ("image_pathname") WHERE ("image_pathname" is not null);--> statement-breakpoint
CREATE INDEX "image_cleanup_queue_queued_at_idx" ON "image_cleanup_queue" ("queued_at");--> statement-breakpoint
CREATE INDEX "items_image_pathname_idx" ON "items" ("image_pathname") WHERE ("image_pathname" is not null);