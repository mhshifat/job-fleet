import { IOrganizationDto } from "./dto";
import { IOrganization } from "@/domain/organization/organization";

export function organizationDtoToOrganization(values: IOrganizationDto): IOrganization | null {
  if (!values) return null;
  return {
    id: values.id,
    name: values.name,
    createdAt: values.created_at,
  }
}