import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { deleteJobByUserAndId, getJobByUserAndId, updateJobByUserAndId } from "../../../../../actions/job";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { createJobFormSchema } from "@/domain/job/validators";
import { jobToJobDto } from "@/infra/job/transform";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const jobId = params.id;
    const job = await getJobByUserAndId({
      id: jobId,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createJobFormSchema.partial().parseAsync(json);
    const { id, ...jobPayload } = jobToJobDto(json);
    const job = await updateJobByUserAndId({
      id: params.id,
      user_id: payload?.data?.uid
    }, {
      ...jobPayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const jobId = params.id;
    const job = await deleteJobByUserAndId({
      id: jobId,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  })
}