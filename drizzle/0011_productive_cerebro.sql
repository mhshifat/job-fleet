ALTER TABLE "organizations" RENAME COLUMN "password" TO "name";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_password_unique";--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "owner_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_name_unique" UNIQUE("name");