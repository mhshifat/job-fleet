"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { INewCategoryPayload } from "@/domain/category/category";
import { unstable_noStore } from "next/cache";
import { jobs } from "../db/schema/job";
import { IJobDtoPayload } from "@/infra/job/dto";

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
}

export async function getJobs() {
  unstable_noStore();

  const results = await db
    .select(jobMap)
    .from(jobs);

  return results;
}

export async function getMyJobs() {
  unstable_noStore();

  const results = await db
    .select(jobMap)
    .from(jobs);

  return results;
}

export async function createJob(values: IJobDtoPayload) {
  const userId = process.env.ADMIN_USER_ID;
  if (!userId) throw new Error("Unauthorized");
  const results = await db
    .insert(jobs)
    .values({
      id: createId(),
      user_id: userId,
      ...values,
      created_at: new Date(),
    })
    .returning(jobMap);

  return results[0];
}