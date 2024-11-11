"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { automations } from "../db/schema/automation";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { IWorkflowDto } from "@/infra/workflow/dto";
import { IAutomationDto } from "@/infra/automation/dto";

const automationMap = {
  id: automations.id,
  title: automations.title,
  created_at: automations.created_at,
}

export async function getAutomations({ stage_id, org_id }: Partial<IAutomationDto>, trx = db) {
  unstable_noStore();

  const queries = [];
  if (stage_id) queries.push(eq(automations.stage_id, stage_id!))
  if (org_id) queries.push(eq(automations.org_id, org_id!))

  const results = await trx
    .select(automationMap)
    .from(automations)
    .where(
      and(
        ...queries
      )
    );

  return results;
}

export async function createAutomation(values: Omit<IAutomationDto, "id" | "created_at">, trx = db) {
  const [data] = await trx
    .insert(automations)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(automationMap);

  return data;
}

export async function getAutomationBy(where: Partial<IAutomationDto>) {
  const queries = [];
  if (where.stage_id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))
  if (where.stage_id) queries.push(eq(automations.stage_id, where.stage_id!))

  const [data] = await db
    .select(automationMap)
    .from(automations)
    .where(
      and(
        ...queries
      )
    );
  
  return data;
}

export async function updateAutomationBy(where: Partial<IAutomationDto>, values: Partial<Omit<IWorkflowDto, "created_at">>, trx = db) {
  delete values["id"];
  const queries = [];
  if (where.stage_id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))
  if (where.stage_id) queries.push(eq(automations.stage_id, where.stage_id!))
  
  const [data] = await trx
    .update(automations)
    .set({
      ...values,
      updated_at: new Date(),
    })
    .where(
      and(
        ...queries
      )
    )
    .returning(automationMap);

  return data;
}

export async function deleteAutomationBy(where: Partial<IAutomationDto>) {
  const queries = [];
  if (where.stage_id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))
  if (where.stage_id) queries.push(eq(automations.stage_id, where.stage_id!))

  const [data] = await db
    .delete(automations)
    .where(
      and(
        ...queries,
      )
    )
    .returning(automationMap);
    
  return data;
}