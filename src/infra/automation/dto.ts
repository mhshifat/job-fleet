export interface IAutomationDto {
  id: string;
  title: string;
  flow?: Record<string, unknown>;
  org_id: string;
  created_at: string;
}