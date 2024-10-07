"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { eq } from "drizzle-orm";
import { sessions } from "../db/schema/session";

const sessionMap = {
  id: sessions.id,
  access_token: sessions.access_token,
  user_id: sessions.user_id,
  created_at: sessions.created_at,
}

export async function getSessionByUser(userId: string) {
  const [data] = await db
    .select(sessionMap)
    .from(sessions)
    .where(
      eq(sessions.user_id, userId)
    );
  
  return data;
}

export async function getSessionById(id: string) {
  const [data] = await db
    .select(sessionMap)
    .from(sessions)
    .where(
      eq(sessions.id, id)
    );
  
  return data;
}

export async function createSession(values: { access_token: string, user_id: string }, trx = db) {
  const [data] = await trx
    .insert(sessions)
    .values({
      id: createId(),
      access_token: values.access_token,
      user_id: values.user_id,
      created_at: new Date(),
    })
    .returning(sessionMap);

  return data;
}

export async function updateSession(values: { access_token?: string; }, trx = db) {
  const [data] = await trx
    .update(sessions)
    .set({
      access_token: values.access_token,
      updated_at: new Date(),
    })
    .returning(sessionMap);

  return data;
}

