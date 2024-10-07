import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { createJob } from "../../../../actions/job";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    const job = await createJob(json);
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 201 });
  })
}