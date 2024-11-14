"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { integrations } from "../db/schema/integration";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { IIntegrationDto } from "@/infra/integration/dto";

const integrationMap = {
  id: integrations.id,
  org_id: integrations.org_id,
  metadata: integrations.metadata,
  type: integrations.type,
  created_at: integrations.created_at,
}

export async function getIntegrations({ org_id }: Partial<IIntegrationDto>, trx = db) {
  unstable_noStore();

  const queries = [];
  if (org_id) queries.push(eq(integrations.org_id, org_id!))

  const results = await trx
    .select(integrationMap)
    .from(integrations)
    .where(
      and(
        ...queries
      )
    );

  return results;
}

export async function createIntegration(values: Omit<IIntegrationDto, "id" | "created_at">, trx = db) {
  const [data] = await trx
    .insert(integrations)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(integrationMap);

  return data;
}

export async function upsertIntegration(values: Omit<IIntegrationDto, "id" | "created_at">, trx = db) {
  const [data] = await trx
    .insert(integrations)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .onConflictDoUpdate({
      target: [integrations.org_id, integrations.type],
      set: {
        ...values,
        updated_at: new Date(),
      }
    })
    .returning(integrationMap);

  return data;
}

export async function getIntegrationBy(where: Partial<IIntegrationDto>) {
  const queries = [];
  if (where.id) queries.push(eq(integrations.id, where.id!))
  if (where.org_id) queries.push(eq(integrations.org_id, where.org_id!))

  const [data] = await db
    .select(integrationMap)
    .from(integrations)
    .where(
      and(
        ...queries
      )
    );
  
  return data;
}

export async function updateIntegrationBy(where: Partial<IIntegrationDto>, values: Partial<Omit<IIntegrationDto, "created_at">>, trx = db) {
  delete values["id"];
  const queries = [];
  if (where.org_id) queries.push(eq(integrations.org_id, where.org_id!))
  
  const [data] = await trx
    .update(integrations)
    .set({
      ...values,
      updated_at: new Date(),
    })
    .where(
      and(
        ...queries
      )
    )
    .returning(integrationMap);

  return data;
}

export async function deleteIntegrationBy(where: Partial<IIntegrationDto>) {
  const queries = [];
  if (where.id) queries.push(eq(integrations.id, where.id!))
  if (where.org_id) queries.push(eq(integrations.org_id, where.org_id!))

  const [data] = await db
    .delete(integrations)
    .where(
      and(
        ...queries,
      )
    )
    .returning(integrationMap);
    
  return data;
}