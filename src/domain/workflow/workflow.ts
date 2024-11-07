export interface IWorkflow {
  id: string;
  title: string;
  createdAt: string;
}

export type INewWorkflowPayload = Omit<IWorkflow, "id" | "createdAt">;