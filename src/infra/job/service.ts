import { http, IHttp } from "@/utils/http";
import {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
  updateJobForId,
} from "../../../actions/job";
import { jobDtoListToJobList, jobDtoToJob, jobToJobDto } from "./transform";
import { IJob, INewJobPayload } from "@/domain/job/job";

class JobService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewJobPayload) {
    console.log("create", values); //jto value ase shb

    const newValues = jobToJobDto(values as IJob);
    const data = await createJob(newValues);
    return jobDtoToJob(data);
  }
  async update(values: INewJobPayload) {
    console.log("values", values);
    // //i should get id as well as value
    const newValues = jobToJobDto(values as IJob);
    const data = await updateJobForId(
      "125c8c71-3a19-4f3e-9b00-f319a7167d8b", ///jobId wont be hardcoded
      newValues
    ); //and passs the jobId with value
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
    const data = await getJobById(jobId);
    return jobDtoToJob(data);
  }
}

export const jobService = new JobService(http);
