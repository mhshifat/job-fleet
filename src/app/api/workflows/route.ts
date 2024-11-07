import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { createWorkflow, getWorkflows } from "../../../../actions/workflow";
import { createWorkflowFormSchema } from "@/domain/workflow/validators";
import { workflowToWorkflowDto } from "@/infra/workflow/transform";

export async function GET(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) return NextResponse.json<APIResponse>({
    success: true,
    data: []
  }, { status: 200 });

  return asyncErrorHandler(async () => {
    const workflows = await getWorkflows({
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: workflows
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createWorkflowFormSchema.parseAsync(json);
    const { id, ...workflowPayload } = workflowToWorkflowDto(json);
    
    const workflow = await createWorkflow({
      ...workflowPayload,
      org_id: payload?.data?.oid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: workflow
    }, { status: 201 });
  }) as Promise<void | Response>
}