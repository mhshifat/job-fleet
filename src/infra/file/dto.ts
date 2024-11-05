export interface IFileDto {
  id: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  created_at: Date;
}

export type IFileDtoPayload = Omit<IFileDto, "id" | "created_at">;