import { http, IHttp } from "@/utils/http";
import { formDtoListToFormList, formDtoToForm, formToFormDto } from "./transform";
import { INewFormPayload } from "@/domain/form/form";
import { IFormDto } from "./dto";

class FormService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewFormPayload) {
    const res = await this._http.post<IFormDto>("/forms", values);
    if (!res.success) throw new Error(res.message);
    return formDtoToForm(res.data);
  }
  
  async update(id: string, values: Partial<INewFormPayload>) {
    const res = await this._http.patch<IFormDto>(`/forms/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async list() {
    // const data = await getJobs();
    // return jobDtoListToJobList(data);
  }

  async myList(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IFormDto[]>(`/forms`, { params: query });
    if (!res.success) throw new Error(res.message);
    return formDtoListToFormList(res.data);
  }

  async getById(jobId: string, params: Record<string, unknown> = {}) {
    const res = await this._http.get<IFormDto>(`/forms/${jobId}`, { params });
    if (!res.success) throw new Error(res.message);
    return formDtoToForm(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IFormDto>(`/forms/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return formDtoToForm(res.data);
  }
}

export const formService = new FormService(http);
