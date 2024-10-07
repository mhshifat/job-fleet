"use server";

import { emailService, ISendMailPayload } from "@/infra/email/service";

export async function sendEmail(payload: ISendMailPayload) {
  await emailService.sendEmail(payload);
}