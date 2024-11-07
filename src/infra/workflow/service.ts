import { http, IHttp } from "@/utils/http";
import { IWorkflowDto } from "./dto";
import { workflowDtoListToWorkflowList, workflowDtoToWorkflow } from "./transform";
import { INewWorkflowPayload } from "@/domain/workflow/workflow";

class WorkflowService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewWorkflowPayload) {
    const res = await this._http.post<IWorkflowDto>("/workflows", values);
    if (!res.success) throw new Error(res.message);
    return workflowDtoToWorkflow(res.data);
  }
  
  async update(id: string, values: Partial<INewWorkflowPayload>) {
    const res = await this._http.patch<IWorkflowDto>(`/workflows/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async list(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IWorkflowDto[]>(`/workflows`, { params: query });
    if (!res.success) throw new Error(res.message);
    return workflowDtoListToWorkflowList(res.data);
  }

  async myList(query: Record<string, unknown> = {}) {
    const res = await this._http.get<IWorkflowDto[]>(`/workflows`, { params: query });
    if (!res.success) throw new Error(res.message);
    return workflowDtoListToWorkflowList(res.data);
  }

  async getById(jobId: string, params: Record<string, unknown> = {}) {
    const res = await this._http.get<IWorkflowDto>(`/workflows/${jobId}`, { params });
    if (!res.success) throw new Error(res.message);
    return workflowDtoToWorkflow(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IWorkflowDto>(`/workflows/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return workflowDtoToWorkflow(res.data);
  }
}

export const workflowService = new WorkflowService(http);
