"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { users } from "../db/schema/user";
import { IRegisterPayload } from "@/domain/auth/auth";
import { createId } from "@/utils/helpers";
import { IUserDto } from "@/infra/user/dto";

const userMap = {
  id: users.id,
  email: users.email,
  first_name: users.first_name,
  last_name: users.last_name,
  verified: users.verified,
  created_at: users.created_at,
}

export async function getUserByEmail(email: string) {
  const [data] = await db
    .select(userMap)
    .from(users)
    .where(
      eq(users.email, email)
    );
  
  return data;
}

export async function getUserById(id: string) {
  const [data] = await db
    .select(userMap)
    .from(users)
    .where(
      eq(users.id, id)
    );
  
  return data;
}

export async function createUser(values: Omit<IUserDto, "id">, trx = db) {
  const [data] = await trx
    .insert(users)
    .values({
      id: createId(),
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      created_at: new Date(),
    })
    .returning(userMap);

  return data;
}

export async function updateUserById(id: string, values: Partial<IUserDto>, trx = db) {
  const [data] = await trx
    .update(users)
    .set({
      first_name: values.first_name,
      last_name: values.last_name,
      verified: values.verified,
      updated_at: new Date(),
    })
    .where(
      eq(users.id, id)
    )
    .returning(userMap);

  return data;
}

export async function deleteUserByEmail(email: string) {
  const [data] = await db
    .delete(users)
    .where(
      eq(users.email, email)
    )
    .returning(userMap);

  return data;
}