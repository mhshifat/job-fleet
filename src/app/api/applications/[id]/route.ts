import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { getApplicationByQuery, updateApplicationById } from "../../../../../actions/application";
import { createApplicationFormSchema } from "@/domain/application/validators";
import { applicationToApplicationDto } from "@/infra/application/transform";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const searchParams = new URL(req.url).searchParams;
  const isPublic = searchParams.get("public");
  const jobId = searchParams.get("jobId");

  if (isPublic === 'true') return asyncErrorHandler(async () => {
    const appId = params.id;
    const application = await getApplicationByQuery({
      id: appId,
      ...jobId?{job_id:jobId}:{}
    });
    
    return NextResponse.json<APIResponse>({
      success: true,
      data: application
    }, { status: 200 });
  }) as Promise<void | Response>

  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const appId = params.id;
    const application = await getApplicationByQuery({
      id: appId,
      candidate_id: payload?.data?.uid,
      ...jobId?{job_id:jobId}:{}
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: application
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createApplicationFormSchema.parseAsync(json);
    const { id, created_at, ...applicationPayload } = applicationToApplicationDto(json);
    const application = await updateApplicationById(params.id, {
      ...applicationPayload
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: application || {}
    }, { status: 200 });
  }) as Promise<void | Response>
}