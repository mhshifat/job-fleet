import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { getJobById } from "../../../../../actions/job";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const job = await getJobById(jobId);
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const [status, message] = err.message?.split(":-");
      return NextResponse.json<APIResponse>({
        success: false,
        message,
      }, { status: parseInt(status) });
    }
    return NextResponse.json<APIResponse>({
      success: false,
      message: "Something went wrong",
    }, { status: 500 });
  }
}