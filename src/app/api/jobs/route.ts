import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { createJob } from "../../../../actions/job";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const job = await createJob(json);
    return NextResponse.json<APIResponse>({
      success: true,
      data: job
    }, { status: 201 });
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