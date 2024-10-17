import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../actions/auth";
import { createForm, getForms } from "../../../../actions/form";
import { formToFormDto } from "@/infra/form/transform";
import { createFormFormSchema } from "@/domain/form/validators";

export async function GET() {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const forms = await getForms({
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: forms
    }, { status: 200 });
  })
}

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createFormFormSchema.parseAsync(json);
    const { id, ...formPayload } = formToFormDto(json);
    const form = await createForm({
      ...formPayload,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: form
    }, { status: 201 });
  })
}