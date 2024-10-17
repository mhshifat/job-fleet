export interface IFormDto {
  id: string;
  title: string;
  fields: string;
  records: Record<string, unknown>;
  status: string;
}