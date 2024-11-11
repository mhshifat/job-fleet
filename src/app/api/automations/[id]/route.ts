import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { deleteAutomationBy, getAutomationBy, updateAutomationBy } from "../../../../../actions/automation";
import { createAutomationFormSchema } from "@/domain/automation/validators";
import { automationToAutomationDto } from "@/infra/automation/transform";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const automationId = params.id;
    const automation = await getAutomationBy({
      id: automationId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automation
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json();
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    await createAutomationFormSchema.partial().parseAsync(json);
    const { id, ...automationPayload } = automationToAutomationDto(json);
    const automation = await updateAutomationBy({
      id: params.id,
      org_id: payload?.data?.oid
    }, {
      ...automationPayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automation
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const automationId = params.id;
    const automation = await deleteAutomationBy({
      id: automationId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automation
    }, { status: 200 });
  }) as Promise<void | Response>
}