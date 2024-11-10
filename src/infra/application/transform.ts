import { IApplication } from "@/domain/application/application";
import { IApplicationDto } from "./dto";

export function applicationDtoToApplication(values: IApplicationDto): IApplication {
  return {
    id: values.id,
    candidateId: values.candidate_id,
    jobId: values.job_id,
    stageId: values.stage_id,
    record: values.record,
    createdAt: values.created_at,
    ...values?.candidate?{
      candidate: {
        id: values?.candidate?.id,
        firstName: values?.candidate?.first_name,
        lastName: values?.candidate?.last_name,
        email: values?.candidate?.email,
        avatar: values?.candidate?.avatar,
      }
    }:{}
  }
}

export function applicationToApplicationDto(values: IApplication): IApplicationDto {
  return {
    id: values.id,
    candidate_id: values.candidateId,
    job_id: values.jobId,
    stage_id: values.stageId,
    record: values.record,
    created_at: values.createdAt,
    ...values?.candidate?{
      candidate: {
        id: values?.candidate?.id,
        first_name: values?.candidate?.firstName,
        last_name: values?.candidate?.lastName,
        email: values?.candidate?.email,
        avatar: values?.candidate?.avatar,
      }
    }:{}
  }
}

export function applicationDtoListToApplicationList(values: IApplicationDto[]): IApplication[] {
  return values.map(item => applicationDtoToApplication(item))
}