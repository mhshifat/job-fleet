import { http, IHttp } from "@/utils/http";
import {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
  updateJobById,
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
    const newValues = jobToJobDto(values as IJob);
    const data = await createJob(newValues);
    return jobDtoToJob(data);
  }
  
  async update(values: INewJobPayload) {
    const newValues = jobToJobDto(values as IJob);
    const data = await updateJobById(
      newValues.id,
      newValues
    );
    return jobDtoToJob(data);
  }

  async list() {
    const data = await getJobs();
    return jobDtoListToJobList(data);
  }

  async myList() {
    const data = await getMyJobs();
    return jobDtoListToJobList(data);
  }

  async getJobById(jobId: string) {
    const res = await this._http.get<IJobDto>(`/jobs/${jobId}`, {});
    if (!res.success) throw new Error(res.message);
    return jobDtoToJob(res.data);
  }
}

export const jobService = new JobService(http);
