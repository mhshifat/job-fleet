import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organization";

export const files = pgTable("files", {
  id: text("id").primaryKey(),
  org_id: text("org_id").references(() => organizations.id, { onDelete: "cascade" }),
  public_id: text("public_id").notNull(),
  width: integer("width"),
  height: integer("height"),
  format: text("format"),
  resource_type: text("resource_type"),
  bytes: integer("bytes").notNull(),
  url: text("url").notNull(),
  secure_url: text("secure_url").notNull(),
  folder: text("folder"),
  original_filename: text("original_filename").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const filesRelations = relations(files, ({ one }) => ({
  organization: one(organizations, {
    fields: [files.org_id],
    references: [organizations.id]
  }),
}));