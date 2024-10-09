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
    response.cookies.set({
      name: "access-token",
      value: tokens.authorizationToken,
      httpOnly: true,
      path: "/",
      maxAge: 300000,
      expires: new Date(Date.now() + 300000),
    });
    response.cookies.set({
      name: "refresh-token",
      value: tokens.authorizationRefreshToken,
      httpOnly: true,
      path: "/",
      maxAge: 86400000,
      expires: new Date(Date.now() + 86400000),
    });
    return response;
  })
}