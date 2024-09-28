import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
}));