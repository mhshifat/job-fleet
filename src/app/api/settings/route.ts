import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { settingsToSettingsDto } from "@/infra/settings/transform";
import { upsertSettingsSchema } from "@/domain/settings/validators";
import { getSettings, upsertSettings } from "../../../../actions/settings";

export async function GET() {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const settings = await getSettings({
      user_id: payload?.data?.uid,
      org_id: payload?.data?.oid,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: settings
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await upsertSettingsSchema.parseAsync(json);
    const data = settingsToSettingsDto(json);
    
    const settings = await upsertSettings({
      ...data,
      user_id: payload?.data?.uid,
      org_id: payload?.data?.oid,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: settings
    }, { status: 200 });
  }) as Promise<void | Response>
}