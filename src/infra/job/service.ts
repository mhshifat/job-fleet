import { http, IHttp } from "@/utils/http";
import { INewCategoryPayload } from "@/domain/category/category";
import { createJob, getJobs, getMyJobs } from "../../../actions/job";
import { jobDtoListToJobList, jobDtoToJob, jobToJobDto } from "./transform";
import { IJob, INewJobPayload } from "@/domain/job/job";

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

  async list() {
    const data = await getJobs();
    return jobDtoListToJobList(data);
  }

  async myList() {
    const data = await getMyJobs();
    return jobDtoListToJobList(data);
  }
}

export const jobService = new JobService(http);