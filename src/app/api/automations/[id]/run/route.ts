import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../../actions/auth";
import { runAutomation } from "../../../../../../actions/automation";


export async function POST(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    const automation = await runAutomation({
      id: params.id,
      org_id: payload?.data?.oid
    }, {
      to: json?.to || "test@test.com",
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: automation
    }, { status: 200 });
  }) as Promise<void | Response>
}