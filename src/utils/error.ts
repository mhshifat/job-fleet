import { toast } from "./toast";

export function handleError(err: unknown) {
  console.log(err);
  if (err instanceof Error) return toast.error(err?.message);
  toast.error("Something went wrong!");
}