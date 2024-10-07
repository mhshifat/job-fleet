import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const credentials = pgTable("credentials", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  password: text("password").notNull(),
  otp: text("otp"),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.user_id],
    references: [users.id]
  })
}));