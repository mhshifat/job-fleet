import { ILoginPayload, IRegisterPayload, ISendOtpPayload } from "@/domain/auth/auth";
import { http, IHttp } from "@/utils/http";
import { loginDtoToLogin } from "./transform";
import { ILoginDto } from "./dto";

class AuthService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async login(values: ILoginPayload) {
    const res = await this._http.post<ILoginDto>("/auth/sign-in", values);
    if (!res.success) throw new Error(res.message);
    return loginDtoToLogin(res.data);
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

  async getMe() {
    const res = await this._http.get<ILoginDto>("/auth/me", {});
    if (!res.success) throw new Error(res.message);
    return loginDtoToLogin(res.data);
  }
}

export const authService = new AuthService(http);