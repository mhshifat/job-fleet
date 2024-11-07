ALTER TABLE "jobs" DROP CONSTRAINT "jobs_workflow_id_workflows_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN IF EXISTS "workflow_id";