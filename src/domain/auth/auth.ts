import { IUser } from "../user/user";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterPayload {
  signUpAs: string;
  organization?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISendOtpPayload {
  email: string;
}

export interface IValidateOtpPayload {
  email: string;
  otp: string;
}