import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { jobs } from "./job";
import { credentials } from "./credential";
import { organizations } from "./organization";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  verified: boolean("verified").default(false),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  jobs: many(jobs),
  credential: one(credentials),
  my_organizations: many(organizations)
}));