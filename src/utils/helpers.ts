import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const createId = () => v4();

export const hashPass = (pass: string) => bcrypt.hash(pass, 10);

export function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}