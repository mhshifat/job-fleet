import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { stages } from "./stage";
import { organizations } from "./organization";

export const automations = pgTable("automations", {
  id: text("id").primaryKey(),
  org_id: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  stage_id: text("stage_id").references(() => stages.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const automationsRelations = relations(automations, ({ one }) => ({
  stage: one(stages, {
    fields: [automations.stage_id],
    references: [stages.id]
  }),
  organization: one(organizations, {
    fields: [automations.org_id],
    references: [organizations.id]
  }),
}));