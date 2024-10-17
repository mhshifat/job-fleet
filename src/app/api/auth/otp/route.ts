import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { sendOtp } from "../../../../../actions/auth";

export async function POST(req: Request) {
  return asyncErrorHandler(async () => {
    const json = await req.json();
    if (!json.email) throw new Error("400:-Email is required");
    await sendOtp(json);
    return NextResponse.json<APIResponse>({
      success: true,
      message: "Please check email to activate your account",
      data: {}
    }, { status: 200 });
  }) as Promise<void | Response>
}