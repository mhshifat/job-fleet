export type SuccessAPIResponse<T> = {
  success: true;
  message?: string;
  data: T;
}

export type FailureAPIResponse = {
  success: false;
  message: string;
  errors?: { path: string | string[]; message: string }[]
}

export type APIResponse<T extends unknown = {}> = SuccessAPIResponse<T> | FailureAPIResponse;