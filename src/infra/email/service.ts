process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import nodemailer from 'nodemailer';

export interface ISendMailPayload {
  from: string;
  to: string;
  html: string;
  subject: string;
}

interface IEmailService {
  sendEmail(args: ISendMailPayload): Promise<void>;
}

class EmailService implements IEmailService {
  static instance: IEmailService;

  constructor(_service: IEmailService) {
    if (!EmailService.instance) EmailService.instance = _service;
    return EmailService.instance;
  }

  sendEmail(args: ISendMailPayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

class MailDevService implements IEmailService {
  constructor() {
    if (!process.env.MAIL_PORT ||
      !process.env.MAIL_HOST
    ) throw new Error("Missing mail environment variables");
  }

  async sendEmail(args: ISendMailPayload) {
    const transport = nodemailer.createTransport({
      port: Number(process.env.MAIL_PORT!),
      host: process.env.MAIL_HOST!,
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      }
    });

    await transport.sendMail({
      from: args.from,
      to: args.to,
      html: args.html,
      subject: args.subject,
      sender: args.from,
    });
  }
}

export const emailService = new EmailService(new MailDevService());