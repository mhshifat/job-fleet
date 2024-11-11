export interface IAutomation {
  id: string;
  title: string;
  stageId?: string;
  orgId?: string;
  createdAt: string;
}

export type INewAutomationPayload = Omit<IAutomation, "id" | "createdAt">;