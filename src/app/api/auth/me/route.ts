import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../../actions/auth";

export async function GET() {
  try {
    const payload = await isAuthenticated();
    const response = NextResponse.json<APIResponse>({
      success: true,
      data: payload?.data || {}
    }, { status: 200 });
    if (payload?.tokens?.authorizationToken) {
      response.cookies.set({
        name: "access-token",
        value: payload.tokens.authorizationToken,
        httpOnly: true,
        path: "/",
        maxAge: 300000,
        expires: new Date(Date.now() + 300000),
      });
      response.cookies.set({
        name: "refresh-token",
        value: payload.tokens.authorizationRefreshToken,
        httpOnly: true,
        path: "/",
        maxAge: 86400000,
        expires: new Date(Date.now() + 86400000),
      });
    }
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json<APIResponse>({
      success: true,
      data: {}
    }, { status: 200 });
  }
}