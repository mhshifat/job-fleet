import { http, IHttp } from "@/utils/http";
import { IStageDto } from "./dto";
import { stageDtoListToStageList, stageDtoToStage } from "./transform";
import { INewStagePayload } from "@/domain/stage/stage";

class StageService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewStagePayload) {
    const res = await this._http.post<IStageDto>("/stages", values);
    if (!res.success) throw new Error(res.message);
    return stageDtoToStage(res.data);
  }
  
  async update(id: string, values: Partial<INewStagePayload>) {
    const res = await this._http.patch<IStageDto>(`/stages/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async list(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IStageDto[]>(`/stages`, { params: query });
    if (!res.success) throw new Error(res.message);
    return stageDtoListToStageList(res.data);
  }

  async myList(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IStageDto[]>(`/stages`, { params: query });
    if (!res.success) throw new Error(res.message);
    return stageDtoListToStageList(res.data);
  }

  async getById(jobId: string, params: Record<string, unknown> = {}) {
    const res = await this._http.get<IStageDto>(`/stages/${jobId}`, { params });
    if (!res.success) throw new Error(res.message);
    return stageDtoToStage(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IStageDto>(`/stages/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return stageDtoToStage(res.data);
  }
}

export const stageService = new StageService(http);
