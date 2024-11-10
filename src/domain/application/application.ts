import { IUser } from "../user/user";

export interface IApplication {
  id: string;
  candidateId: string;
  stageId?: string;
  jobId: string;
  record: Record<string, string>;
  createdAt: Date;
  candidate?: IUser;
}

export type INewApplicationPayload = Pick<IApplication, "record" | "jobId" | "stageId">;