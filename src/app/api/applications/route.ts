import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { applicationToApplicationDto } from "@/infra/application/transform";
import { createApplication, getApplicationsByQuery } from "../../../../actions/application";
import { createApplicationFormSchema } from "@/domain/application/validators";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const isPublic = searchParams.get("public");
  const jobId = searchParams.get("jobId");
  const stageId = searchParams.get("stageId");
  const candidateId = searchParams.get("candidateId");

  if (isPublic === 'true') return asyncErrorHandler(async () => {
    const applications = await getApplicationsByQuery({
      ...jobId?{job_id:jobId}:{},
      ...stageId?{stage_id:stageId}:{},
      ...candidateId?{candidate_id:candidateId}:{},
    });
    
    return NextResponse.json<APIResponse>({
      success: true,
      data: applications
    }, { status: 200 });
  }) as Promise<void | Response>

  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const applications = await getApplicationsByQuery({
      ...jobId?{job_id:jobId}:{},
      ...stageId?{stage_id:stageId}:{},
      ...candidateId?{candidate_id:candidateId}:{},
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: applications
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createApplicationFormSchema.parseAsync(json);
    const { id, created_at, ...applicationPayload } = applicationToApplicationDto(json);
    const application = await createApplication({
      ...applicationPayload,
      candidate_id: payload?.data?.uid,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: application
    }, { status: 201 });
  }) as Promise<void | Response>
}
