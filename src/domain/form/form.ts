export interface IForm {
  id: string;
  title: string;
  fields: string;
  status: string;
}

export type INewFormPayload = Omit<IForm, "id" | "createdAt">;