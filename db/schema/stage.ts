import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workflows } from "./workflow";
import { automations } from "./automation";

export const stages = pgTable("stages", {
  id: text("id").primaryKey(),
  workflow_id: text("workflow_id").notNull().references(() => workflows.id, { onDelete: "cascade" }),
  automation_id: text("automation_id").references(() => automations.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const stagesRelations = relations(stages, ({ one }) => ({
  workflow: one(workflows, {
    fields: [stages.workflow_id],
    references: [workflows.id]
  }),
  automation: one(automations, {
    fields: [stages.automation_id],
    references: [automations.id]
  }),
}));