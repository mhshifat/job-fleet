import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const forms = pgTable("forms", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  fields: text("fields").notNull(),
  status: text("status").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const formsRelations = relations(forms, ({ many, one }) => ({
  user: one(users, {
    fields: [forms.user_id],
    references: [users.id]
  })
}));