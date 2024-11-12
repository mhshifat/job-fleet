import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { deleteStageBy, getStageBy, updateStageBy } from "../../../../../actions/stage";
import { createStageFormSchema } from "@/domain/stage/validators";
import { stageToStageDto } from "@/infra/stage/transform";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const searchParams = new URL(req.url).searchParams;
  const workflowId = searchParams.get("workflowId");
  if (!workflowId) throw new Error("400:-Workflow id is required");
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const stageId = params.id;
    const stage = await getStageBy({
      id: stageId,
      workflow_id: workflowId
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: stage
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json();
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    await createStageFormSchema.partial().parseAsync(json);
    const { id, ...stagePayload } = stageToStageDto(json);
    const stage = await updateStageBy({
      id: params.id,
      workflow_id: stagePayload?.workflow_id,
      ...stagePayload?.automation_id?{
        automation_id: stagePayload?.automation_id
      }:{},
    }, {
      ...stagePayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: stage
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const searchParams = new URL(req.url).searchParams;
  const workflowId = searchParams.get("workflowId");
  if (!workflowId) throw new Error("400:-Workflow id is required");
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const stageId = params.id;
    const stage = await deleteStageBy({
      id: stageId,
      workflow_id: workflowId
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: stage
    }, { status: 200 });
  }) as Promise<void | Response>
}