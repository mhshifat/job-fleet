import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { getJobById } from "../../../../../actions/job";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const jobId = params.id;
    const job = await getJobById(jobId);
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  })
}