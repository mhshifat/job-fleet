import { APIResponse } from "@/utils/types";
import { NextResponse } from "next/server";
import { asyncErrorHandler } from "@/utils/error";
import { uploadFiles } from "../../../../actions/file";
import { isAuthenticated } from "../../../../actions/auth";

export async function POST(req: Request) {
  const payload = await isAuthenticated();
  if (!payload?.data?.uid) throw new Error("401:-Unauthorized");
  const formData = await req.formData();
  const files = formData.getAll("file");
  
  return asyncErrorHandler(async () => {
    const filesRes = await uploadFiles(files as File[], payload?.data?.oid);
    return NextResponse.json<APIResponse>({
      success: true,
      data: filesRes
    }, { status: 201 });
  }) as Promise<void | Response>
}
