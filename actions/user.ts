"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { users } from "../db/schema/user";
import { IRegisterPayload } from "@/domain/auth/auth";
import { createId } from "@/utils/helpers";

const userMap = {
  id: users.id,
  email: users.email,
  first_name: users.first_name,
  last_name: users.last_name,
}

export async function getUserByEmail(email: string) {
  const results = await db
    .select(userMap)
    .from(users)
    .where(
      eq(users.email, email)
    );
  
  return results[0];
}

export async function getUserById(id: string) {
  const results = await db
    .select(userMap)
    .from(users)
    .where(
      eq(users.id, id)
    );
  
  return results[0];
}

export async function createUser(values: IRegisterPayload) {
  const results = await db
    .insert(users)
    .values({
      id: createId(),
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      created_at: new Date(),
    })
    .returning(userMap);

  return results[0];
}