"use server";

import { ILoginPayload, IRegisterPayload } from "@/domain/auth/auth";
import { createUser, deleteUserByEmail, getUserByEmail, updateUserById } from "./user";
import { generateOTP, hashPass } from "@/utils/helpers";
import { db } from "../db/drizzle";
import { addUserToOrganization, createOrganization, getOrganizationByName } from "./organization";
import { createCredential, getCredentialByUser, updateCredential } from "./credential";
import { sendEmail } from "./email";
import { addMinutesToCurrentTime } from "@/utils/date";

export async function login(values: ILoginPayload) {
  return {
    token: "",
    user: null
  }
}

export async function signUp(values: IRegisterPayload) {
  const existingUser = await getUserByEmail(values.email);
  if (existingUser && !existingUser.verified) await deleteUserByEmail(values.email);
  const hashedPass = await hashPass(values.password);
  const otp = generateOTP();
  const otpExp = addMinutesToCurrentTime(5);
  const otpStr = `${otpExp}:${otp}`;
  await db.transaction(async (trx) => {
    const user = await createUser({
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      verified: false
    }, trx);
    await createCredential({ password: hashedPass, otp: otpStr, user_id: user.id }, trx);
    if (values.signUpAs === "ORGANIZATION") {
      let organization = await getOrganizationByName(values.organization!, trx);
      if (organization) throw new Error("400:-Organization name taken");
      organization = await createOrganization({
        name: values.organization!,
        owner_id: user.id,
      }, trx);
      await addUserToOrganization({
        user_id: user.id,
        organization_id: organization.id
      }, trx);
    }
  });
  
  await sendEmail({
    subject: "Please activate your account",
    from: process.env.MAIL_FROM!,
    to: values.email,
    html: `
      <p>${otp}</p>
      <p>This OTP will be valid for 5 mins only</p>
    `
  })
}

export async function sendOtp(values: { email: string }) {
  const existingUser = await getUserByEmail(values.email);
  if (!existingUser) throw new Error("404:-User not exists");
  if (existingUser && existingUser.verified) throw new Error("400:-Already verified");
  const otp = generateOTP();
  const otpExp = addMinutesToCurrentTime(5);
  const otpStr = `${otpExp}:${otp}`;
  await db.transaction(async (trx) => {
    await updateCredential({ otp: otpStr }, trx);
  });
  
  await sendEmail({
    subject: "Please activate your account",
    from: process.env.MAIL_FROM!,
    to: values.email,
    html: `
      <p>${otp}</p>
      <p>This OTP will be valid for 5 mins only</p>
    `
  })
}

export async function validateOtp(values: { email: string; otp: string }) {
  const existingUser = await getUserByEmail(values.email);
  if (!existingUser) throw new Error("404:-User not exists");
  if (existingUser && existingUser.verified) throw new Error("400:-Already verified");
  const credential = await getCredentialByUser(existingUser.id);
  const now = Date.now();
  if (!credential?.otp) throw new Error("400:-Invalid OTP");
  const [exp, otp] = credential.otp.split(":");
  if (now >= +exp || otp !== values.otp) throw new Error("400:-Invalid OTP");
  await db.transaction(async (trx) => {
    await updateCredential({ otp: "" }, trx);
    await updateUserById(existingUser.id, { verified: true }, trx);
  });
}