export interface IIntegrationDto {
  id: string;
  metadata?: Record<string, unknown>;
  org_id: string;
  type: string;
  created_at: string;
}