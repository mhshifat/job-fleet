"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { forms } from "../db/schema/form";
import { createId } from "@/utils/helpers";
import { IFormDto } from "@/infra/form/dto";
import { unstable_noStore } from "next/cache";

const formMap = {
  id: forms.id,
  title: forms.title,
  fields: forms.fields,
  status: forms.status,
  created_at: forms.created_at,
}

export async function getForms({ user_id }: { user_id?: string }) {
  unstable_noStore();

  if (user_id) return await db
    .select(formMap)
    .from(forms)
    .where(eq(forms.user_id, user_id));

  const results = await db
    .select(formMap)
    .from(forms);

  return results;
}

export async function getFormByUserAndId(where: { id: string, user_id: string }) {
  const [data] = await db
    .select(formMap)
    .from(forms)
    .where(
      and(
        eq(forms.id, where.id),
        eq(forms.user_id, where.user_id),
      )
    );
  
  return data;
}

export async function createForm(values: Omit<IFormDto, "id"> & { user_id: string }, trx = db) {
  const [data] = await trx
    .insert(forms)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(formMap);

  return data;
}

export async function updateFormByUserAndId(where: { id: string, user_id: string }, values: Partial<IFormDto>, trx = db) {
  delete values["id"];
  
  const [data] = await trx
    .update(forms)
    .set({
      ...values,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(forms.id, where.id),
        eq(forms.user_id, where.user_id)
      )
    )
    .returning(formMap);

  return data;
}

export async function deleteFormByUserAndId(where: { id: string; user_id: string }) {
  const [data] = await db
    .delete(forms)
    .where(
      and(
        eq(forms.id, where.id),
        eq(forms.user_id, where.user_id),
      )
    )
    .returning(formMap);
    
  return data;
}