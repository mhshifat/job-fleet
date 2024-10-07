"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { IRegisterPayload } from "@/domain/auth/auth";
import { createId } from "@/utils/helpers";
import { organizations, organizationUsers } from "../db/schema/organization";
import { ICreateOrganizationPayload } from "@/domain/organization/organization";

const organizationMap = {
  id: organizations.id,
  name: organizations.name,
  created_at: organizations.created_at,
}

const organizationUserMap = {
  user_id: organizationUsers.user_id,
  organization_id: organizationUsers.organization_id,
}

export async function getOrganizationByName(name: string, trx = db) {
  const [data] = await trx
    .select(organizationMap)
    .from(organizations)
    .where(
      eq(organizations.name, name)
    );
  
  return data;
}

export async function createOrganization(values: ICreateOrganizationPayload & { owner_id: string }, trx = db) {
  const [data] = await trx
    .insert(organizations)
    .values({
      id: createId(),
      name: values.name,
      owner_id: values.owner_id,
      created_at: new Date(),
    })
    .returning(organizationMap);

  return data;
}

export async function addUserToOrganization(values: { user_id: string; organization_id: string }, trx = db) {
  const [data] = await trx
    .insert(organizationUsers)
    .values({
      user_id: values.user_id,
      organization_id: values.organization_id,
    })
    .returning(organizationUserMap);

  return data;
}
