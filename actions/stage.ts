"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { stages } from "../db/schema/stage";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { IStageDto } from "@/infra/stage/dto";

const stageMap = {
  id: stages.id,
  title: stages.title,
  workflow_id: stages.workflow_id,
  automation_id: stages.automation_id,
  created_at: stages.created_at,
}

export async function getStages({ workflow_id }: { workflow_id?: string }) {
  unstable_noStore();

  const queries = [
    eq(stages.workflow_id, workflow_id!)
  ];

  const results = await db
    .select(stageMap)
    .from(stages)
    .where(
      and(
        ...queries
      )
    );

  return results;
}

export async function createStage(values: Omit<IStageDto, "id" | "created_at"> & { workflow_id: string }, trx = db) {
  const [data] = await trx
    .insert(stages)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(stageMap);

  return data;
}

export async function getStageBy(where: { id: string, workflow_id?: string }) {
  const queries = [];
  if (where.id) queries.push(eq(stages.id, where.id!))
  if (where.workflow_id) queries.push(eq(stages.workflow_id, where.workflow_id!))
    
  const [data] = await db
    .select(stageMap)
    .from(stages)
    .where(
      and(
        ...queries
      )
    );
  
  return data;
}

export async function updateStageBy(where: { id: string, workflow_id: string }, values: Partial<IStageDto>, trx = db) {
  delete values["id"];
  
  const [data] = await trx
    .update(stages)
    .set({
      title: values.title,
      workflow_id: values.workflow_id,
      automation_id: values.automation_id,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(stages.id, where.id),
        eq(stages.workflow_id, where.workflow_id)
      )
    )
    .returning(stageMap);

  return data;
}

export async function deleteStageBy(where: { id: string; workflow_id: string }) {
  const [data] = await db
    .delete(stages)
    .where(
      and(
        eq(stages.id, where.id),
        eq(stages.workflow_id, where.workflow_id),
      )
    )
    .returning(stageMap);
    
  return data;
}