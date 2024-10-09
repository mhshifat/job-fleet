import { http, IHttp } from "@/utils/http";
import {
  updateJobByUserAndId,
} from "../../../actions/job";
import { jobDtoListToJobList, jobDtoToJob, jobToJobDto } from "./transform";
import { IJob, INewJobPayload } from "@/domain/job/job";
import { IJobDto } from "./dto";

class JobService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewJobPayload) {
    const res = await this._http.post<IJobDto>("/jobs", values);
    if (!res.success) throw new Error(res.message);
    return jobDtoToJob(res.data);
  }
  
  async update(id: string, values: Partial<INewJobPayload>) {
    const res = await this._http.patch<IJobDto>(`/jobs/${id}`, values);
    if (!res.success) throw new Error(res.message);
    return jobDtoToJob(res.data);
  }

  async list() {
    // const data = await getJobs();
    // return jobDtoListToJobList(data);
  }

  async myList() {
    const res = await this._http.get<IJobDto[]>(`/jobs`, {});
    if (!res.success) throw new Error(res.message);
    return jobDtoListToJobList(res.data);
  }

  async getById(jobId: string) {
    const res = await this._http.get<IJobDto>(`/jobs/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return jobDtoToJob(res.data);
  }

  async deleteById(jobId: string) {
    const res = await this._http.delete<IJobDto>(`/jobs/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return jobDtoToJob(res.data);
  }
}

export const jobService = new JobService(http);
