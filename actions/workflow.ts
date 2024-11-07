"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { workflows } from "../db/schema/workflow";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { IWorkflowDto } from "@/infra/workflow/dto";

const workflowMap = {
  id: workflows.id,
  title: workflows.title,
  created_at: workflows.created_at,
}

export async function getWorkflows({ org_id }: { org_id?: string }, trx = db) {
  unstable_noStore();

  const queries = [
    eq(workflows.org_id, org_id!)
  ];

  const results = await trx
    .select(workflowMap)
    .from(workflows)
    .where(
      and(
        ...queries
      )
    );

  return results;
}

export async function createWorkflow(values: Omit<IWorkflowDto, "id" | "created_at"> & { org_id: string }, trx = db) {
  const [data] = await trx
    .insert(workflows)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(workflowMap);

  return data;
}

export async function getWorkflowBy(where: { id: string, org_id: string }) {
  const [data] = await db
    .select(workflowMap)
    .from(workflows)
    .where(
      and(
        eq(workflows.id, where.id),
        eq(workflows.org_id, where.org_id),
      )
    );
  
  return data;
}

export async function updateWorkflowBy(where: { id: string, org_id: string }, values: Partial<IWorkflowDto>, trx = db) {
  delete values["id"];
  
  const [data] = await trx
    .update(workflows)
    .set({
      title: values.title,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(workflows.id, where.id),
        eq(workflows.org_id, where.org_id)
      )
    )
    .returning(workflowMap);

  return data;
}

export async function deleteWorkflowBy(where: { id: string; org_id: string }) {
  const [data] = await db
    .delete(workflows)
    .where(
      and(
        eq(workflows.id, where.id),
        eq(workflows.org_id, where.org_id),
      )
    )
    .returning(workflowMap);
    
  return data;
}