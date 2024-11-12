export interface IAutomation {
  id: string;
  title: string;
  flow?: Record<string, unknown>;
  orgId: string;
  createdAt: string;
}

export type INewAutomationPayload = Omit<IAutomation, "id" | "createdAt">;