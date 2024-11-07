import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { createStage, getStages } from "../../../../actions/stage";
import { createStageFormSchema } from "@/domain/stage/validators";
import { stageToStageDto } from "@/infra/stage/transform";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const workflowId = searchParams.get("workflowId");
  if (!workflowId) throw new Error("400:-Workflow id is required");
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const stages = await getStages({
      workflow_id: workflowId
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: stages
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createStageFormSchema.parseAsync(json);
    const { id, ...stagePayload } = stageToStageDto(json);
    const stage = await createStage({
      ...stagePayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: stage
    }, { status: 201 });
  }) as Promise<void | Response>
}