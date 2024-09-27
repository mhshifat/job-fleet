"use server";

import { ILoginPayload } from "@/domain/auth/auth";
import { createUser, getUserByEmail } from "./user";

export async function login(values: ILoginPayload) {
  if (
    process.env.ADMIN_EMAIL !== values.email ||
    process.env.ADMIN_PASS !== values.password
  ) throw new Error("Invalid credentials");
  let user = await getUserByEmail(values.email);
  if (!user) user = await createUser({
    ...values,
    firstName: "Admin",
    lastName: "Profile"
  });

  return {
    token: user.id,
    user
  }
}