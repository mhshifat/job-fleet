ALTER TABLE "forms" ADD COLUMN "records" json DEFAULT '{}'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "form_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
