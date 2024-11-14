import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const integrations = pgTable("integrations", {
  id: text("id").primaryKey(),
  org_id: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  metadata: json("metadata").default({}),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
}, (t) => ({
  unq: unique().on(t.org_id, t.type)
}));

export const integrationsRelations = relations(integrations, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [integrations.org_id],
    references: [organizations.id]
  }),
}));
