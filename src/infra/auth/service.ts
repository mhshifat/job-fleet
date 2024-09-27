import { ILoginPayload } from "@/domain/auth/auth";
import { http, IHttp } from "@/utils/http";
import { loginDtoToLogin } from "./transform";
import { login } from "../../../actions/auth";
import { getUserById } from "../../../actions/user";
import { userDtoToUser } from "../user/transform";

class AuthService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async login(values: ILoginPayload) {
    const data = await login(values);
    return loginDtoToLogin(data);
  }

  async getMe(token: string) {
    const data = await getUserById(token);
    return userDtoToUser(data);
  }
}

export const authService = new AuthService(http);