"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { jobs } from "../db/schema/job";
import { IJobDtoPayload } from "@/infra/job/dto";
import { and, eq } from "drizzle-orm";
import { createForm, getForms } from "./form";
import { createWorkflow, getWorkflows } from "./workflow";
import { createStage } from "./stage";
import { createAutomation } from "./automation";

const jobMap = {
  id: jobs.id,
  form_id: jobs.form_id,
  workflow_id: jobs.workflow_id,
  title: jobs.title,
  category: jobs.category,
  code: jobs.code,
  description: jobs.description,
  type: jobs.type,
  vacancy: jobs.vacancy,
  job_place: jobs.job_place,
  deadline: jobs.deadline,
  job_level: jobs.job_level,
  num_of_experience: jobs.num_of_experience,
  salary_type: jobs.salary_type,
  currency: jobs.currency,
  salary_range: jobs.salary_range,
  street_address: jobs.street_address,
  city: jobs.city,
  zip_code: jobs.zip_code,
  country: jobs.country,
  linkedin_url: jobs.linkedin_url,
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

export async function getPublishedJobById(id: string) {
  const [data] = await db
    .select(jobMap)
    .from(jobs)
    .where(
      and(
        eq(jobs.id, id),
        eq(jobs.status, "PUBLISHED"),
      )
    );
  
  return data;
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

export async function createJob(values: IJobDtoPayload & { user_id: string, org_id: string, workflow_id?: string }) {
  if (!values?.user_id) throw new Error("User id is required");
  const job = await db.transaction(async (trx) => {
    let [form] = await getForms({
      user_id: values.user_id,
      status: "PUBLISHED"
    }, trx);
    if (!form && !values?.form_id) form = await createForm({
      title: "Default Form",
      user_id: values.user_id,
      status: "PUBLISHED"
    }, trx)
    let [workflow] = await getWorkflows({
      org_id: values?.org_id
    }, trx);
    if (!workflow && !values?.workflow_id) {
      workflow = await createWorkflow({
        title: "Default Workflow",
        org_id: values.org_id
      }, trx);
      const applicationReceived = await createAutomation({
        title: "Application Received",
        org_id: values.org_id,
        flow: {
          nodes: [
              {
                "id": "aa21a4ca-414c-4d50-80c0-8a06330435c0",
                "type": "resource_trigger",
                "position": {
                    "x": 113,
                    "y": 41
                },
                "data": {
                    "resource": "APPLICATION",
                    "property": "stage_id"
                },
                "measured": {
                    "width": 359,
                    "height": 170
                },
                "selected": false,
                "dragging": false
              },
              {
                "id": "0b7371dc-ac58-49ff-b26c-3ac9fe78c04a",
                "type": "email_action",
                "position": {
                    "x": 159,
                    "y": 280
                },
                "data": {
                    "subject": "Application Received",
                    "content": "Thank you for applying to our job, someone from our team will reach you soon through a call."
                },
                "measured": {
                    "width": 263,
                    "height": 288
                },
                "selected": true,
                "dragging": false
              }
          ],
          edges: [
              {
                  "source": "aa21a4ca-414c-4d50-80c0-8a06330435c0",
                  "target": "0b7371dc-ac58-49ff-b26c-3ac9fe78c04a",
                  "id": "xy-edge__aa21a4ca-414c-4d50-80c0-8a06330435c0-0b7371dc-ac58-49ff-b26c-3ac9fe78c04a"
              }
          ]
      }
      });
      await createStage({
        title: "Application Received",
        workflow_id: workflow.id,
        automation_id: applicationReceived.id
      }, trx)
    }
    
    const [data] = await trx
      .insert(jobs)
      .values({
        id: createId(),
        ...values,
        form_id: values.form_id || form.id,
        workflow_id: values.workflow_id || workflow.id,
        created_at: new Date(),
      })
      .returning(jobMap);
  
    return data;
  });
  
  return job;
}

export async function updateJobByUserAndId(where: { id: string, user_id: string }, values: IJobDtoPayload) {
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
