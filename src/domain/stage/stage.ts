export interface IStage {
  id: string;
  title: string;
  workflowId: string;
  createdAt: string;
}

export type INewStagePayload = Omit<IStage, "id" | "createdAt">;