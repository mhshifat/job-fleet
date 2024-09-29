export interface IJob {
  id: string;
  title: string;
  category: string;
  code: string | null;
  description: string;
  type: string;
  jobPlace: string;
  vacancy: number;
  deadline: string;
  jobLabel: string;
  numOfExperience: string;
  salaryType: string;
  currency: string;
  salaryRange: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  status: string;
  createdAt: Date;
}

export type INewJobPayload = Omit<IJob, "id" | "createdAt">;
