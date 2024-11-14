"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { automations } from "../db/schema/automation";
import { createId } from "@/utils/helpers";
import { unstable_noStore } from "next/cache";
import { IWorkflowDto } from "@/infra/workflow/dto";
import { IAutomationDto } from "@/infra/automation/dto";
import { sendEmail } from "./email";
import { generateGoogleMeetLink } from "./services/google";

const automationMap = {
  id: automations.id,
  title: automations.title,
  flow: automations.flow,
  created_at: automations.created_at,
}

export async function getAutomations({ org_id }: Partial<IAutomationDto>, trx = db) {
  unstable_noStore();

  const queries = [];
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

export async function runAutomation(where: Partial<Omit<IAutomationDto, "created_at" | "title">>, payload?: Record<string, unknown>, trx = db) {
  const queries = [];
  if (where.id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))
  
  const [data] = await trx
    .select(automationMap)
    .from(automations)
    .where(
      and(
        ...queries
      )
    );

  const flowNodes = (data?.flow as { nodes: { id: string, type: string, data: unknown }[] })?.nodes?.filter(item => !item?.type?.includes("trigger")) || [];
  const flowEdges = (data?.flow as { edges: { source: string, target: string }[] })?.edges?.map(item => ({
    source: flowNodes?.find(n => n.id === item.source),
    target: flowNodes?.find(n => n.id === item.target),
  })) || [];

  function runFlows() {
    for (const edge of flowEdges) {
      switch (edge?.target?.type) {
        case "email_action": {
          const data = edge?.target?.data as { content: string, subject: string };
          const payloadData = payload as { to?: string, email?: string };
          sendEmail({
            to: payloadData?.to || payloadData?.email || "",
            from: process.env.MAIL_FROM!,
            subject: data.subject,
            html: data.content
          })
        }
        case "google_meet_action": {
          const data = edge?.target?.data as { summary: string };
          const payloadData = payload as { to?: string, email?: string };
          if (!data.summary) return;
          generateGoogleMeetLink({
            orgId: where.org_id!,
            meetingTime: 1800000,
            date: new Date((new Date()).getTime() + (60*60*24*1000)).toISOString(),
            summary: data.summary,
            attendees: [payloadData?.to || payloadData?.email || ""]
          })
        }
      }
    }
  }

  runFlows();
  
  return data;
}

export async function getAutomationBy(where: Partial<IAutomationDto>) {
  const queries = [];
  if (where.id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))

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
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))
  
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
  if (where.id) queries.push(eq(automations.id, where.id!))
  if (where.org_id) queries.push(eq(automations.org_id, where.org_id!))

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