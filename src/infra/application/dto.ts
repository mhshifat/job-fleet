import { IUserDto } from "../user/dto";

export interface IApplicationDto {
  id: string;
  candidate_id: string;
  job_id: string;
  record: Record<string, string>;
  created_at: Date;
  candidate?: IUserDto;
}

export type IApplicationDtoPayload = Omit<IApplicationDto, "id" | "created_at">;