import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { getIntegrations } from "../../../../actions/integration";
import { createIntegrationFormSchema } from "@/domain/integration/validators";
import { integrationToIntegrationDto } from "@/infra/integration/transform";
import { generateGoogleMeetAuthLink } from "../../../../actions/services/google";

export async function GET(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const integrations = await getIntegrations({
      org_id: payload?.data?.oid,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: integrations
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PUT(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  if (!payload?.data?.oid) throw new Error("403:-Forbidden");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createIntegrationFormSchema.parseAsync(json);
    const { id, ...integrationPayload } = integrationToIntegrationDto(json);
    switch (integrationPayload.type) {
      case "google_meet": {
        const link = await generateGoogleMeetAuthLink({
          state: JSON.stringify({
            ...integrationPayload,
            auth: {
              uid: payload?.data?.uid,
              oid: payload?.data?.oid,
            }
          })
        });
        return NextResponse.json<APIResponse>({
          success: true,
          data: {
            link
          }
        }, { status: 200 });
      }
    }
    return NextResponse.json<APIResponse>({
      success: true,
      data: {}
    }, { status: 200 });
  }) as Promise<void | Response>
}