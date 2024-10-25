import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import copy from 'copy-to-clipboard';
import { toast } from './toast';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const createId = () => v4();

export const hashPass = (pass: string) => bcrypt.hash(pass, 10);
export const comparePass = (pass: string, hashed: string) => bcrypt.compare(pass, hashed);

export const createToken = (payload: Record<string, unknown>, signature: string, expires: string) => jwt.sign(payload, `${signature}-${process.env.JWT_SECRET}`, {
  expiresIn: expires,
});
export const decodeToken = <T extends {}>(token: string) => jwt.decode(token) as T;
export const verifyToken = async <T extends {}>(token: string, signature: string) => {
  const data = jwt.decode(token) as JwtPayload;
  if (!data || !data?.exp) throw new Error("Invalid token");
  const now = Date.now();
  if (now >= (data.exp * 1000)) throw new Error("Token expired");
  const jwtData = jwt.verify(token, `${signature}-${process.env.JWT_SECRET}`);
  return jwtData as T;
};

export function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export function copyToClipboard(text: string) {
  toast.success("Copied");
  return copy(text)
}