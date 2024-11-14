export interface IIntegration {
  id: string;
  metadata?: Record<string, unknown>;
  orgId: string;
  type: string;
  createdAt: string;
}

export type INewIntegrationPayload = Omit<IIntegration, "id" | "createdAt" | "orgId">;