import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { createJob, getJobs } from "../../../../actions/job";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { jobToJobDto } from "@/infra/job/transform";
import { createJobFormSchema } from "@/domain/job/validators";

export async function GET(_: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const jobs = await getJobs({
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: jobs
    }, { status: 200 });
  })
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createJobFormSchema.parseAsync({
      ...json,
      deadline: json.deadline
    });
    const { id, ...jobPayload } = jobToJobDto(json);
    const job = await createJob({
      ...jobPayload,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 201 });
  })
}