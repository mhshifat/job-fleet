import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { validateOtp } from "../../../../../actions/auth";

export async function POST(req: Request) {
  return asyncErrorHandler(async () => {
    const json = await req.json();
    if (!json?.email || !json?.otp) throw new Error("400:-Missing fields");
    await validateOtp(json);
    return NextResponse.json<APIResponse>({
      success: true,
      message: "Your account has been created, you can login now",
      data: {}
    }, { status: 200 });
  })
}