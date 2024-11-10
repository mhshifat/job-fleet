"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { applications } from "../db/schema/application";
import { IApplicationDto, IApplicationDtoPayload } from "@/infra/application/dto";
import { and, eq, SQL } from "drizzle-orm";
import { users } from "../db/schema/user";

const applicationMap = {
  id: applications.id,
  job_id: applications.job_id,
  stage_id: applications.stage_id,
  candidate_id: applications.candidate_id,
  record: applications.record,
  created_at: applications.created_at,
  updated_at: applications.updated_at,
};
const applicationMapWithCandidate = {
  ...applicationMap,
  candidate: users
};

export async function createApplication(values: IApplicationDtoPayload) {
  if (!values?.candidate_id) throw new Error("Candidate id is required");

  const [data] = await db
    .insert(applications)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning();

  return data;
}

export async function getApplicationByQuery(query: Partial<IApplicationDto>) {
  const wheres = [
    eq(applications.id, query.id!)
  ];
  if (query.job_id) wheres.push(eq(applications.job_id, query.job_id));
  if (query.candidate_id) wheres.push(eq(applications.candidate_id, query.candidate_id));
  const [data] = await db
    .select(applicationMapWithCandidate)
    .from(applications)
    .leftJoin(users, eq(users.id, applications.candidate_id))
    .where(
      and(
        ...wheres
      )
    );
  
  return data;
}

export async function getApplicationsByQuery(query: Partial<IApplicationDto>) {
  const wheres: SQL<unknown>[] = [];
  if (query.id) wheres.push(eq(applications.id, query.id));
  if (query.job_id) wheres.push(eq(applications.job_id, query.job_id));
  if (query.candidate_id) wheres.push(eq(applications.candidate_id, query.candidate_id));

  const results = await db
    .select(applicationMapWithCandidate)
    .from(applications)
    .leftJoin(users, eq(users.id, applications.candidate_id))
    .where(
      and(
        ...wheres
      )
    );
  
  return results;
}

export async function updateApplicationById(id: string, values: Partial<IApplicationDto>, trx = db) {
  delete values["id"];
  
  const [data] = await trx
    .update(applications)
    .set({
      ...values,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(applications.id, id),
      )
    )
    .returning(applicationMap);

  return data;
}