export interface IForm {
  id: string;
  title: string;
  fields: string;
  records: Record<string, Record<string, unknown>[]>;
  status: string;
}

export type INewFormPayload = Omit<IForm, "id" | "createdAt">;