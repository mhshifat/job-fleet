import { IAutomationDto } from "./dto";
import { IAutomation } from "@/domain/automation/automation";

export function automationDtoToAutomation(values: IAutomationDto): IAutomation {
  return {
    id: values.id,
    title: values.title,
    flow: values.flow,
    orgId: values.org_id,
    createdAt: values.created_at,
  }
}

export function automationToAutomationDto(values: IAutomation): IAutomationDto {
  return {
    id: values.id,
    title: values.title,
    flow: values.flow,
    org_id: values.orgId,
    created_at: values.createdAt,
  }
}

export function automationDtoListToAutomationList(values: IAutomationDto[]): IAutomation[] {
  return values.map(item => automationDtoToAutomation(item))
}