import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { files } from "./file";
import { workflows } from "./workflow";
import { automations } from "./automation";

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(),
  owner_id: text("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull().unique(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const organizationsRelations = relations(organizations, ({ one, many }) => ({
  user: one(users, {
    fields: [organizations.owner_id],
    references: [users.id]
  }),
  files: many(files),
  automations: many(automations),
  workflows: many(workflows),
}));

export const organizationUsers = pgTable("organization_users", {
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  organization_id: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({
    columns: [t.user_id, t.organization_id]
  }),
}));