import { asyncErrorHandler } from "@/utils/error";
import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { validateGoogleAuth } from "../../../../../../actions/services/google";
import { upsertIntegration } from "../../../../../../actions/integration";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  return asyncErrorHandler(async () => {
    if (!code) throw new Error("400:-Invalid code");
    const parsedState = JSON.parse(state || "{}")
    if (!parsedState?.auth?.uid) throw new Error("403:-Forbidden");
    const tokens = await validateGoogleAuth(code);
    
    await upsertIntegration({
      org_id: parsedState?.auth?.oid,
      type: parsedState?.type,
      metadata: {
        tokens
      }
    })
    
    return NextResponse.redirect(`${process.env.CLIENT_URL}/dashboard/integrations`);
  }) as Promise<void | Response>
}