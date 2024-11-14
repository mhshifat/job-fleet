import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { deleteAutomationBy, getAutomationBy, updateAutomationBy } from "../../../../../actions/automation";
import { createAutomationFormSchema } from "@/domain/automation/validators";
import { automationToAutomationDto } from "@/infra/automation/transform";
import { deleteIntegrationBy, getIntegrationBy, updateIntegrationBy } from "../../../../../actions/integration";
import { createIntegrationFormSchema } from "@/domain/integration/validators";
import { integrationToIntegrationDto } from '@/infra/integration/transform';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const integrationId = params.id;
    const integration = await getIntegrationBy({
      id: integrationId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: integration
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json();
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    await createIntegrationFormSchema.partial().parseAsync(json);
    const { id, ...integrationPayload } = integrationToIntegrationDto(json);
    const integration = await updateIntegrationBy({
      id: params.id,
      org_id: payload?.data?.oid
    }, {
      ...integrationPayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: integration
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const integrationId = params.id;
    const integration = await deleteIntegrationBy({
      id: integrationId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: integration
    }, { status: 200 });
  }) as Promise<void | Response>
}