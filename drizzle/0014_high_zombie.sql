ALTER TABLE "automations" DROP CONSTRAINT "automations_stage_id_stages_id_fk";
--> statement-breakpoint
ALTER TABLE "stages" ADD COLUMN "automation_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stages" ADD CONSTRAINT "stages_automation_id_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automations"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "automations" DROP COLUMN IF EXISTS "stage_id";