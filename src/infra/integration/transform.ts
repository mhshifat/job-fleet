import { IIntegrationDto } from "./dto";
import { IIntegration } from "@/domain/integration/integration";

export function integrationDtoToIntegration(values: IIntegrationDto): IIntegration {
  return {
    id: values.id,
    type: values.type,
    metadata: values.metadata,
    orgId: values.org_id,
    createdAt: values.created_at,
  }
}

export function integrationToIntegrationDto(values: IIntegration): IIntegrationDto {
  return {
    id: values.id,
    type: values.type,
    metadata: values.metadata,
    org_id: values.orgId,
    created_at: values.createdAt,
  }
}

export function integrationDtoListToIntegrationList(values: IIntegrationDto[]): IIntegration[] {
  return values.map(item => integrationDtoToIntegration(item))
}