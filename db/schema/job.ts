import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { forms } from "./form";

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  user_id: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  form_id: text("form_id").references(() => forms.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  code: text("code").default(""),
  description: text("description").notNull(),
  type: text("type").notNull(),
  vacancy: integer("vacancy").notNull(),
  job_place: text("job_place").notNull(),
  deadline: text("deadline").notNull(),
  job_level: text("job_level").notNull(),
  num_of_experience: text("num_of_experience").notNull(),
  salary_type: text("salary_type").notNull(),
  currency: text("currency").notNull(),
  salary_range: text("salary_range").notNull(),
  street_address: text("street_address").notNull(),
  city: text("city").notNull(),
  zip_code: text("zip_code").notNull(),
  country: text("country").notNull(),
  status: text("status").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

export const jobsRelations = relations(jobs, ({ many, one }) => ({
  user: one(users, {
    fields: [jobs.user_id],
    references: [users.id]
  }),
  form: one(forms, {
    fields: [jobs.form_id],
    references: [forms.id]
  }),
}));