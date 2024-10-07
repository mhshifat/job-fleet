import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { getJobById } from "../../../../../actions/job";
import { asyncErrorHandler } from "@/utils/error";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return asyncErrorHandler(async () => {
    const jobId = params.id;
    const job = await getJobById(jobId);
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  })
}