import { IJob } from "@/domain/job/job";
import { IJobDto } from "./dto";

export function jobDtoToJob(values: IJobDto): IJob {
  return {
    id: values.id,
    title: values.title,
    category: values.category,
    code: values.code,
    description: values.description,
    type: values.type,
    jobPlace: values.job_place,
    vacancy: values.vacancy,
    deadline: values.deadline,
    jobLevel: values.job_level,
    numOfExperience: values.num_of_experience,
    salaryType: values.salary_type,
    currency: values.currency,
    salaryRange: values.salary_range,
    streetAddress: values.street_address,
    city: values.city,
    zipCode: values.zip_code,
    country: values.country,
    status: values.status,
    createdAt: values.created_at,
  }
}

export function jobToJobDto(values: IJob): IJobDto {
  return {
    id: values.id,
    title: values.title,
    category: values.category,
    code: values.code,
    description: values.description,
    type: values.type,
    job_place: values.jobPlace,
    vacancy: values.vacancy,
    deadline: values.deadline,
    job_level: values.jobLevel,
    num_of_experience: values.numOfExperience,
    salary_type: values.salaryType,
    currency: values.currency,
    salary_range: values.salaryRange,
    street_address: values.streetAddress,
    city: values.city,
    zip_code: values.zipCode,
    country: values.country,
    status: values.status,
    created_at: values.createdAt,
  }
}

export function jobDtoListToJobList(values: IJobDto[]): IJob[] {
  return values.map(item => jobDtoToJob(item))
}