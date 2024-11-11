import { IAutomationDto } from "./dto";
import { IAutomation } from "@/domain/automation/automation";

export function automationDtoToAutomation(values: IAutomationDto): IAutomation {
  return {
    id: values.id,
    title: values.title,
    orgId: values.org_id,
    stageId: values.stage_id,
    createdAt: values.created_at,
  }
}

export function automationToAutomationDto(values: IAutomation): IAutomationDto {
  return {
    id: values.id,
    title: values.title,
    org_id: values.orgId,
    stage_id: values.stageId,
    created_at: values.createdAt,
  }
}

export function automationDtoListToAutomationList(values: IAutomationDto[]): IAutomation[] {
  return values.map(item => automationDtoToAutomation(item))
}