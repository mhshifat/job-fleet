"use server";

import { ICandidateOnboardingPayload, IRegisterPayload } from "@/domain/auth/auth";
import { createUser, deleteUserByEmail, getUserByEmail, getUserById, updateUserById } from "./user";
import { comparePass, createToken, decodeToken, generateOTP, hashPass, verifyToken } from "@/utils/helpers";
import { db } from "../db/drizzle";
import { addUserToOrganization, createOrganization, getOrganizationByName, getOrganizationsByUser } from "./organization";
import { createCredential, getCredentialByUser, updateCredentialByUserAndId } from "./credential";
import { sendEmail } from "./email";
import { addMinutesToCurrentTime } from "@/utils/date";
import { ILoginDto, ILoginDtoPayload } from "@/infra/auth/dto";
import { IUserDto } from "@/infra/user/dto";
import { createSession, getSessionById, getSessionByUser, updateSessionByUserAndId, deleteSessionById } from "./session";
import { cookies } from "next/headers";

export async function prepareAuthPayload({password, ...user}: IUserDto & { password: string }) {
  const [organizationUser] = await getOrganizationsByUser(user.id, { limit: 1 });
  const payload = {
    uid: organizationUser?.user_id || user.id,
    oid: organizationUser?.organization_id,
    user: organizationUser?.user || user,
    organization: organizationUser?.organization,
  }
  
  const accessToken = createToken(payload, password, "1d");
  let session = await getSessionByUser(user.id);
  if (session) session = await updateSessionByUserAndId({
    id: session.id,
    user_id: user.id
  }, {
    access_token: accessToken,
  })
  else session = await createSession({
    access_token: accessToken,
    user_id: user.id
  });
  const authorizationToken = createToken({
    sid: session.id,
  }, password, "5m");
  const authorizationRefreshToken = createToken({
    sid: session.id,
  }, password, "1d");

  return {
    data: payload,
    tokens: {
      authorizationToken,
      authorizationRefreshToken
    }
  }
}

export async function login(values: ILoginDtoPayload) {
  const existingUser = await getUserByEmail(values.email);
  if (!existingUser || !existingUser?.verified) throw new Error("400:-Invalid credentials");
  const credential = await getCredentialByUser(existingUser.id);
  if (!credential) throw new Error("400:-Invalid credentials");
  const isPwdMatched = await comparePass(values.password, credential.password);
  if (!isPwdMatched) throw new Error("400:-Invalid credentials");
  const data = await prepareAuthPayload({
    ...existingUser as IUserDto,
    password: credential.password
  });

  return data;
}

export async function signUpAsCandidate(values: ICandidateOnboardingPayload) {
  const existingUser = await getUserByEmail(values.email);
  if (!existingUser) {
    const hashedPass = await hashPass(values.password);
    const result = await db.transaction(async (trx) => {
      const user = await createUser({
        email: values.email,
        first_name: "Anonymous",
        last_name: "User",
        verified: true
      }, trx);
      const credential = await createCredential({ password: hashedPass, otp: "", user_id: user.id }, trx);
      return {
        credential,
        user
      }
    });
    const data = await prepareAuthPayload({
      ...result.user as IUserDto,
      password: result.credential.password
    });
    return data;
  }
  const credential = await getCredentialByUser(existingUser.id);
  const isPwdMatched = await comparePass(values.password, credential.password);
  if (!isPwdMatched) throw new Error("400:-Invalid credentials");
  const data = await prepareAuthPayload({
    ...existingUser as IUserDto,
    password: credential.password
  });
  return data;
}

export async function signUp(values: IRegisterPayload) {
  const existingUser = await getUserByEmail(values.email);
  if (existingUser && !existingUser.verified) await deleteUserByEmail(values.email);
  if (existingUser && existingUser.verified) throw new Error("400:-User taken");
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

  sendEmail({
    subject: "Please activate your account",
    from: process.env.MAIL_FROM!,
    to: values.email,
    html: `
      <p>${otp}</p>
      <p>This OTP will be valid for 5 mins only</p>
    `
  });
}

export async function sendOtp(values: { email: string }) {
  const existingUser = await getUserByEmail(values.email);
  if (!existingUser) throw new Error("404:-User not exists");
  if (existingUser && existingUser.verified) throw new Error("400:-Already verified");
  const credential = await getCredentialByUser(existingUser.id);
  const otp = generateOTP();
  const otpExp = addMinutesToCurrentTime(5);
  const otpStr = `${otpExp}:${otp}`;
  await db.transaction(async (trx) => {
    await updateCredentialByUserAndId({ id: credential.id, user_id: existingUser.id }, { otp: otpStr }, trx);
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
    await updateCredentialByUserAndId({ id: credential.id, user_id: existingUser.id }, { otp: "" }, trx);
    await updateUserById(existingUser.id, { verified: true }, trx);
  });
}

export async function isAuthenticated() {
  const { value: accessToken } = cookies()?.get("access-token") || {} as { value: string };
  const { value: refreshToken } = cookies()?.get("refresh-token") || {} as { value: string };
  const decodedToken = decodeToken<{ sid: string }>(accessToken);
  if (!decodedToken || !decodedToken?.sid) throw new Error("Invalid token");
  const session = await getSessionById({
    id: decodedToken.sid,
  });
  if (!session || !session.access_token) return null;
  const decodedSessionToken = decodeToken<{ uid: string }>(session.access_token);
  const existingUser = await getUserById(decodedSessionToken.uid);
  if (!existingUser) throw new Error("Invalid token");
  const credential = await getCredentialByUser(decodedSessionToken.uid);
  if (!credential) throw new Error("Invalid token");
  try {
    await verifyToken(accessToken, credential.password);
    const payload = await verifyToken<ILoginDto>(session.access_token, credential.password);
    return {
      data: payload,
      tokens: {
        authorizationToken: "",
        authorizationRefreshToken: "",
      },
    };
  } catch (err) {
    try {
      await verifyToken(refreshToken, credential.password);
      await verifyToken<ILoginDto>(session.access_token, credential.password);
      const data = await prepareAuthPayload({
        ...existingUser as IUserDto,
        password: credential.password
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function logout() {
  const { value: accessToken } = cookies()?.get("access-token") as { value: string };
  const decodedToken = decodeToken<{ sid: string }>(accessToken);
  if (!decodedToken || !decodedToken?.sid) throw new Error("Invalid token");
  await deleteSessionById({
    id: decodedToken.sid,
  });
}