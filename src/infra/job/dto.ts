export interface IJobDto {
  id: string;
  title: string;
  category: string;
  code: string | null;
  description: string;
  type: string;
  job_place: string;
  vacancy: number;
  deadline: string;
  job_level: string;
  num_of_experience: string;
  salary_type: string;
  currency: string;
  salary_range: string;
  street_address: string;
  city: string;
  zip_code: string;
  country: string;
  status: string;
  created_at: Date;
}

export type IJobDtoPayload = Omit<IJobDto, "id" | "created_at">;