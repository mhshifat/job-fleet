import { http, IHttp } from "@/utils/http";
import { IAutomationDto } from "./dto";
import { automationDtoListToAutomationList, automationDtoToAutomation } from "./transform";
import { INewAutomationPayload } from "@/domain/automation/automation";

class AutomationService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewAutomationPayload) {
    const res = await this._http.post<IAutomationDto>("/automations", values);
    if (!res.success) throw new Error(res.message);
    return automationDtoToAutomation(res.data);
  }
  
  async update(id: string, values: Partial<INewAutomationPayload>) {
    const res = await this._http.patch<IAutomationDto>(`/automations/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return automationDtoToAutomation(res.data);
  }
  
  async run(id: string) {
    const res = await this._http.post<IAutomationDto>(`/automations/${id}/run`, {});
    if (!res.success) throw new Error(res.message);
    return automationDtoToAutomation(res.data);
  }

  async list(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IAutomationDto[]>(`/automations`, { params: query });
    if (!res.success) throw new Error(res.message);
    return automationDtoListToAutomationList(res.data);
  }

  async myList(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IAutomationDto[]>(`/automations`, { params: query });
    if (!res.success) throw new Error(res.message);
    return automationDtoListToAutomationList(res.data);
  }

  async getById(jobId: string, params: Record<string, unknown> = {}) {
    const res = await this._http.get<IAutomationDto>(`/automations/${jobId}`, { params });
    if (!res.success) throw new Error(res.message);
    return automationDtoToAutomation(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IAutomationDto>(`/automations/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return automationDtoToAutomation(res.data);
  }
}

export const automationService = new AutomationService(http);
