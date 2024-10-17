import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { isAuthenticated } from "../../../../../actions/auth";
import { deleteFormByUserAndId, getFormByUserAndId, updateFormByUserAndId } from "../../../../../actions/form";
import { createFormFormSchema } from "@/domain/form/validators";
import { formToFormDto } from "@/infra/form/transform";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const formId = params.id;
    const form = await getFormByUserAndId({
      id: formId,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: form
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");

  return asyncErrorHandler(async () => {
    const json = await req.json();
    await createFormFormSchema.partial().parseAsync(json);
    const { id, ...formPayload } = formToFormDto(json);
    const form = await updateFormByUserAndId({
      id: params.id,
      user_id: payload?.data?.uid
    }, {
      ...formPayload,
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: form
    }, { status: 200 });
  }) as Promise<void | Response>
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  return asyncErrorHandler(async () => {
    const formId = params.id;
    const form = await deleteFormByUserAndId({
      id: formId,
      user_id: payload?.data?.uid
    });
    return NextResponse.json<APIResponse>({
      success: true,
      data: form
    }, { status: 200 });
  }) as Promise<void | Response>
}