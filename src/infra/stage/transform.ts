import { IStageDto } from "./dto";
import { IStage } from "@/domain/stage/stage";

export function stageDtoToStage(values: IStageDto): IStage {
  return {
    id: values.id,
    title: values.title,
    workflowId: values.workflow_id,
    automationId: values.automation_id,
    createdAt: values.created_at,
  }
}

export function stageToStageDto(values: IStage): IStageDto {
  return {
    id: values.id,
    title: values.title,
    workflow_id: values.workflowId,
    automation_id: values.automationId,
    created_at: values.createdAt,
  }
}

export function stageDtoListToStageList(values: IStageDto[]): IStage[] {
  return values.map(item => stageDtoToStage(item))
}