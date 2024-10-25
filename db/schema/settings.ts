import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { organizations } from "./organization";
import { users } from "./user";

export const settings = pgTable("settings", {
  id: text("id").primaryKey(),
  org_id: text("org_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  street_address: text("street_address").notNull(),
  city: text("city").notNull(),
  zip_code: text("zip_code").notNull(),
  country: text("country").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
}, (t) => ({
  organizationUserIndex: uniqueIndex().on(t.user_id, t.org_id)
}));