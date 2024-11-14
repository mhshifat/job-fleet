import { http, IHttp } from "@/utils/http";
import { IIntegrationDto } from "./dto";
import { integrationDtoListToIntegrationList, integrationDtoToIntegration } from "./transform";
import { INewIntegrationPayload } from "@/domain/integration/integration";

class IntegrationService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewIntegrationPayload) {
    const res = await this._http.post<IIntegrationDto>("/integrations", values);
    if (!res.success) throw new Error(res.message);
    return integrationDtoToIntegration(res.data);
  }

  async connect(values: INewIntegrationPayload) {
    const res = await this._http.put<{ link: string }>("/integrations", values);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }
  
  async update(id: string, values: Partial<INewIntegrationPayload>) {
    const res = await this._http.patch<IIntegrationDto>(`/integrations/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return integrationDtoToIntegration(res.data);
  }

  async list(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IIntegrationDto[]>(`/integrations`, { params: query });
    if (!res.success) throw new Error(res.message);
    return integrationDtoListToIntegrationList(res.data);
  }

  async myList(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IIntegrationDto[]>(`/integrations`, { params: query });
    if (!res.success) throw new Error(res.message);
    return integrationDtoListToIntegrationList(res.data);
  }

  async getById(jobId: string, params: Record<string, unknown> = {}) {
    const res = await this._http.get<IIntegrationDto>(`/integrations/${jobId}`, { params });
    if (!res.success) throw new Error(res.message);
    return integrationDtoToIntegration(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IIntegrationDto>(`/integrations/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return integrationDtoToIntegration(res.data);
  }
}

export const integrationService = new IntegrationService(http);
