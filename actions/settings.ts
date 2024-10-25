"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { settings } from "../db/schema/settings";
import { ISettingsDto } from "@/infra/settings/dto";
import { and, eq, SQL } from "drizzle-orm";

const settingsMap = {
  id: settings.id,
  user_id: settings.user_id,
  org_id: settings.org_id,
  street_address: settings.street_address,
  city: settings.city,
  zip_code: settings.zip_code,
  country: settings.country,
  created_at: settings.created_at,
  updated_at: settings.updated_at,
};

export async function getSettings(query: Partial<ISettingsDto>) {
  const where: SQL<unknown>[] = []

  if (query.user_id) where.push(eq(settings.user_id, query.user_id));
  if (query.org_id) where.push(eq(settings.org_id, query.org_id));

  const results = await db
    .select(settingsMap)
    .from(settings)
    .where(and(...where));

  return results;
}

export async function upsertSettings(payload: Partial<ISettingsDto>) {
  const [data] = await db
    .insert(settings)
    .values({
      ...payload as ISettingsDto,
      id: payload.id || createId(),
      created_at: new Date(),
    })
    .onConflictDoUpdate({
      target: settings.id,
      set: {
        ...payload,
        updated_at: new Date(),
      }
    })
    .returning(settingsMap);

  return data;
}
