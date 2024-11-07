import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { stages } from "./stage";

export const workflows = pgTable("workflows", {
  id: text("id").primaryKey(),
  org_id: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const workflowsRelations = relations(workflows, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [workflows.org_id],
    references: [organizations.id]
  }),
  stages: many(stages)
}));
