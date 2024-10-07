import { ILoginPayload, IRegisterPayload, ISendOtpPayload } from "@/domain/auth/auth";
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

  async register(values: IRegisterPayload) {
    const res = await this._http.post("/auth/sign-up", values);
    if (!res.success) throw new Error(res.message);
    return res.message || "Successfully registered an account";
  }

  async sendOtp(values: ISendOtpPayload) {
    const res = await this._http.post("/auth/otp", values);
    if (!res.success) throw new Error(res.message);
    return res.message || "Please check your email";
  }

  async validateOtp(values: ISendOtpPayload) {
    const res = await this._http.post("/auth/activate", values);
    if (!res.success) throw new Error(res.message);
    return res.message || "Successfully activated your account";
  }

  async getMe(token: string) {
    const data = await getUserById(token);
    return userDtoToUser(data);
  }
}

export const authService = new AuthService(http);