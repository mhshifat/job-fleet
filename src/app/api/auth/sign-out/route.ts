import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { logout } from "../../../../../actions/auth";

export async function DELETE(_: Request) {
  return asyncErrorHandler(async () => {
    await logout();
    const response = NextResponse.json<APIResponse>({
      success: true,
      message: "Signed Out",
      data: {}
    }, { status: 200 });
    response.cookies.set("access-token", "");
    response.cookies.set("refresh-token", "");
    return response;
  });
}