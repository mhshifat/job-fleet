"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { jobs } from "../db/schema/job";
import { IJobDtoPayload } from "@/infra/job/dto";
import { and, eq } from "drizzle-orm";

const jobMap = {
  id: jobs.id,
  title: jobs.title,
  category: jobs.category,
  code: jobs.code,
  description: jobs.description,
  type: jobs.type,
  vacancy: jobs.vacancy,
  job_place: jobs.job_place,
  deadline: jobs.deadline,
  job_label: jobs.job_label,
  num_of_experience: jobs.num_of_experience,
  salary_type: jobs.salary_type,
  currency: jobs.currency,
  salary_range: jobs.salary_range,
  street_address: jobs.street_address,
  city: jobs.city,
  zip_code: jobs.zip_code,
  country: jobs.country,
  status: jobs.status,
  created_at: jobs.created_at,
  updated_at: jobs.updated_at,
};

export async function getJobs({ user_id }: { user_id?: string }) {
  unstable_noStore();

  if (user_id) return await db
    .select(jobMap)
    .from(jobs)
    .where(eq(jobs.user_id, user_id));

  const results = await db
    .select(jobMap)
    .from(jobs);

  return results;
}

export async function getJobByUserAndId(where: { id: string, user_id: string }) {
  const [data] = await db
    .select(jobMap)
    .from(jobs)
    .where(
      and(
        eq(jobs.id, where.id),
        eq(jobs.user_id, where.user_id),
      )
    );
  
  return data;
}

export async function createJob(values: IJobDtoPayload & { user_id: string }) {
  const [data] = await db
    .insert(jobs)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(jobMap);

  return data;
}

export async function updateJobByUserAndId(where: { id: string, user_id: string }, values: IJobDtoPayload) {
  const userId = process.env.ADMIN_USER_ID;
  if (!userId) throw new Error("401:-Unauthorized");

  const [data] = await db
    .update(jobs)
    .set({
      ...values,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(jobs.id, where.id),
        eq(jobs.user_id, where.user_id),
      )
    )
    .returning(jobMap);
    
  return data;
}

export async function deleteJobByUserAndId(where: { id: string, user_id: string }) {
  const [data] = await db
    .delete(jobs)
    .where(
      and(
        eq(jobs.id, where.id),
        eq(jobs.user_id, where.user_id),
      )
    )
    .returning(jobMap);
    
  return data;
}
