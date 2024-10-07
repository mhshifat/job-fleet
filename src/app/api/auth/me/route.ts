import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { isAuthenticated } from "../../../../../actions/auth";

export async function GET(_: Request) {
  try {
    const payload = await isAuthenticated();
    const response = NextResponse.json<APIResponse>({
      success: true,
      data: payload?.data || {}
    }, { status: 200 });
    if (payload?.tokens?.authorizationToken) {
      response.cookies.set("access-token", payload.tokens.authorizationToken);
      response.cookies.set("refresh-token", payload.tokens.authorizationRefreshToken);
    }
    return response;
  } catch (err) {
    return NextResponse.json<APIResponse>({
      success: true,
      data: {}
    }, { status: 200 });
  }
}