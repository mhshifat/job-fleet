"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { categories } from "../db/schema/category";
import { INewCategoryPayload } from "@/domain/category/category";
import { unstable_noStore } from "next/cache";

const categoryMap = {
  id: categories.id,
  name: categories.name,
}

export async function getCategories() {
  unstable_noStore();

  const results = await db
    .select(categoryMap)
    .from(categories);

  return results;
}

export async function createCategory(values: INewCategoryPayload) {
  const results = await db
    .insert(categories)
    .values({
      id: createId(),
      name: values.name,
      created_at: new Date(),
    })
    .returning(categoryMap);

  return results[0];
}