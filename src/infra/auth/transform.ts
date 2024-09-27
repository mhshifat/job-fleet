import { ILoginResponse } from "@/domain/auth/auth";
import { ILoginDto } from "./dto";
import { userDtoToUser } from "../user/transform";

export function loginDtoToLogin(values: ILoginDto): ILoginResponse {
  return {
    token: values.token,
    user: userDtoToUser(values.user)
  }
}