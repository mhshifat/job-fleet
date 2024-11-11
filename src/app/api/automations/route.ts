import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { createAutomation, getAutomations } from "../../../../actions/automation";
import { createAutomationFormSchema } from "@/domain/automation/validators";
import { automationToAutomationDto } from "@/infra/automation/transform";

export async function GET(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const automations = await getAutomations({
      org_id: payload?.data?.oid,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automations
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createAutomationFormSchema.parseAsync(json);
    const { id, ...automationPayload } = automationToAutomationDto(json);
    const automation = await createAutomation({
      ...automationPayload,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automation
    }, { status: 201 });
  }) as Promise<void | Response>
}