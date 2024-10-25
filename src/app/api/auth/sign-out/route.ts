import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { logout } from "../../../../../actions/auth";

export async function DELETE() {
  return asyncErrorHandler(async () => {
    await logout();
    const response = NextResponse.json<APIResponse>({
      success: true,
      message: "Signed Out",
      data: {}
    }, { status: 200 });
    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");
    return response;
  }) as Promise<void | Response>;
}