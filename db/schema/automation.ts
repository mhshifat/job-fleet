import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { stages } from "./stage";
import { organizations } from "./organization";

export const automations = pgTable("automations", {
  id: text("id").primaryKey(),
  org_id: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  flow: json("flow"),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const automationsRelations = relations(automations, ({ one }) => ({
  organization: one(organizations, {
    fields: [automations.org_id],
    references: [organizations.id]
  }),
}));