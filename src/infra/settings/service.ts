import { ISettings } from "@/domain/settings/settings";
import { http, IHttp } from "@/utils/http";
import { ISettingsDto } from "./dto";
import { settingsDtoToSettings } from "./transform";

class SettingsService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async get() {
    const res = await this._http.get<ISettingsDto[]>("/settings", {});
    if (!res.success) throw new Error(res.message);
    return settingsDtoToSettings(res.data[0]);
  }

  async upsert(values: Partial<ISettings>) {
    const res = await this._http.post<ISettingsDto>("/settings", values);
    if (!res.success) throw new Error(res.message);
    return settingsDtoToSettings(res.data);
  }
}

export const settingsService = new SettingsService(http);