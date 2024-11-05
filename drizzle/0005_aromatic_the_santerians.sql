ALTER TABLE "files" ADD COLUMN "public_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "format" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "resource_type" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "bytes" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "secure_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "folder" text;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "original_filename" text NOT NULL;