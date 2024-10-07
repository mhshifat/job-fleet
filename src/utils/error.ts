import { ZodError } from "zod";
import { toast } from "./toast";
import { NextResponse } from "next/server";
import { APIResponse } from "./types";

export function handleError(err: unknown) {
  console.log(err);
  if (err instanceof Error) return toast.error(err?.message);
  toast.error("Something went wrong!");
}

export async function asyncErrorHandler(asyncFunction: () => Promise<unknown>) {
  try {
    return await asyncFunction();
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json<APIResponse>({
      success: false,
      message: "Invalid fields",
      errors: err.errors.map(item => ({
        message: item.message,
        path: String(item.path)
      }))
    }, { status: 422 });
    if (err instanceof Error) {
      const [status, message] = err.message?.split(":-");
      return NextResponse.json<APIResponse>({
        success: false,
        message,
      }, { status: parseInt(status) });
    }
    return NextResponse.json<APIResponse>({
      success: false,
      message: "Something went wrong",
    }, { status: 500 });
  }
}