import { IWorkflow } from "@/domain/workflow/workflow";
import { IWorkflowDto } from "./dto";

export function workflowDtoToWorkflow(values: IWorkflowDto): IWorkflow {
  return {
    id: values.id,
    title: values.title,
    createdAt: values.created_at,
  }
}

export function workflowToWorkflowDto(values: IWorkflow): IWorkflowDto {
  return {
    id: values.id,
    title: values.title,
    created_at: values.createdAt,
  }
}

export function workflowDtoListToWorkflowList(values: IWorkflowDto[]): IWorkflow[] {
  return values.map(item => workflowDtoToWorkflow(item))
}