export interface IOrganization {
  id: string;
  name: string;
  createdAt: string;
}

export interface ICreateOrganizationPayload {
  name: string;
}