import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { jobs } from "./job";
import { stages } from "./stage";

export const applications = pgTable("applications", {
  id: text("id").primaryKey(),
  candidate_id: text("candidate_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  job_id: text("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  stage_id: text("stage_id").references(() => stages.id, { onDelete: "set null" }),
  record: json("record").notNull().default({}),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const applicationsRelations = relations(applications, ({ many, one }) => ({
  candidate: one(users, {
    fields: [applications.candidate_id],
    references: [users.id]
  }),
  job: one(jobs, {
    fields: [applications.job_id],
    references: [jobs.id]
  }),
  stage: one(stages, {
    fields: [applications.stage_id],
    references: [stages.id]
  }),
}));