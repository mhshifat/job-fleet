"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { credentials } from "../db/schema/credential";
import { and, eq } from "drizzle-orm";

const credentialMap = {
  id: credentials.id,
  password: credentials.password,
  otp: credentials.otp,
  created_at: credentials.created_at,
}

export async function getCredentialByUser(userId: string) {
  const [data] = await db
    .select(credentialMap)
    .from(credentials)
    .where(
      eq(credentials.user_id, userId)
    );
  
  return data;
}

export async function createCredential(values: { password: string; otp: string, user_id: string }, trx = db) {
  const [data] = await trx
    .insert(credentials)
    .values({
      id: createId(),
      password: values.password,
      otp: values.otp,
      user_id: values.user_id,
      created_at: new Date(),
    })
    .returning(credentialMap);

  return data;
}

export async function updateCredentialByUserAndId(where: { id: string; user_id: string }, values: { password?: string; otp?: string }, trx = db) {
  const [data] = await trx
    .update(credentials)
    .set({
      password: values.password,
      otp: values.otp,
      updated_at: new Date(),
    })
    .where(
      and(
        eq(credentials.id, where.id),
        eq(credentials.user_id, where.user_id),
      )
    )
    .returning(credentialMap);

  return data;
}

