import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { deleteFormByUserAndId, getFormByUserAndId, getPublishedFormById, updateFormById, updateFormByUserAndId } from "../../../../../actions/form";
import { createFormFormSchema } from "@/domain/form/validators";
import { formToFormDto } from "@/infra/form/transform";
import { deleteWorkflowBy, getWorkflowBy, updateWorkflowBy } from "../../../../../actions/workflow";
import { createWorkflowFormSchema } from "@/domain/workflow/validators";
import { workflowToWorkflowDto } from "@/infra/workflow/transform";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) return NextResponse.json<APIResponse>({
    success: true,
    data: {}
  }, { status: 200 });

  return asyncErrorHandler(async () => {
    const workflowId = params.id;
    const form = await getWorkflowBy({
      id: workflowId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: form
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json();
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    await createWorkflowFormSchema.partial().parseAsync(json);
    const { id, ...workflowPayload } = workflowToWorkflowDto(json);
    const workflow = await updateWorkflowBy({
      id: params.id,
      org_id: payload?.data?.oid
    }, {
      ...workflowPayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: workflow
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const workflowId = params.id;
    const workflow = await deleteWorkflowBy({
      id: workflowId,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: workflow
    }, { status: 200 });
  }) as Promise<void | Response>
}