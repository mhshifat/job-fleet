import { loginFormSchema } from "@/domain/auth/validators";
import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { login } from "../../../../../actions/auth";

export async function POST(req: Request) {
  return asyncErrorHandler(async () => {
    const json = await req.json();
    await loginFormSchema.parseAsync(json);
    const { data, tokens } = await login(json);
    const response =  NextResponse.json<APIResponse>({
      success: true,
      data: data
    }, { status: 200 });
    response.cookies.set("access-token", tokens.authorizationToken);
    response.cookies.set("refresh-token", tokens.authorizationRefreshToken);
    return response;
  })
}