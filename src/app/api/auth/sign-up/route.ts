import { registerFormSchema } from "@/domain/auth/validators";
import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { signUp } from "../../../../../actions/auth";

export async function POST(req: Request) {
  return asyncErrorHandler(async () => {
    const json = await req.json();
    await registerFormSchema.parseAsync(json);
    await signUp(json);
    return NextResponse.json<APIResponse>({
      success: true,
      message: "Please check email to activate your account",
      data: {}
    }, { status: 201 });
  })
}