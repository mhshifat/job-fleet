import { http, IHttp } from "@/utils/http";
import { applicationDtoListToApplicationList, applicationDtoToApplication } from "./transform";
import { INewApplicationPayload } from "@/domain/application/application";
import { IApplicationDto } from "./dto";

class ApplicationService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewApplicationPayload) {
    const res = await this._http.post<IApplicationDto>("/applications", values);
    if (!res.success) throw new Error(res.message);
    return applicationDtoToApplication(res.data);
  }

  async findBy(params: Record<string, unknown> = {}) {
    const res = await this._http.get<IApplicationDto[]>(`/applications`, { params });
    if (!res.success) throw new Error(res.message);
    return applicationDtoListToApplicationList(res.data);
  }
}

export const applicationService = new ApplicationService(http);
