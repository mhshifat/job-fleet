CREATE TABLE IF NOT EXISTS "organization_users" (
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	CONSTRAINT "organization_users_user_id_organization_id_pk" PRIMARY KEY("user_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "organizations_password_unique" UNIQUE("password")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
