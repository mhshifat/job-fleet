import axios from 'axios';
import { APIResponse, SuccessAPIResponse } from './types';

export interface IHttp {
  get<T>(url: string, options: { params?: Record<string, unknown> }): Promise<APIResponse<T>>;
  post<T>(url: string, body: unknown): Promise<APIResponse<T>>;
}

class Http implements IHttp {
  private _baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api";

  async get<T>(url: string, options: { params?: Record<string, unknown> }) {
    const { data } = await axios({
      method: "GET",
      url: `${this._baseUrl}${url}`,
      params: options.params
    });
    return data as Promise<SuccessAPIResponse<T>>;
  }
  
  async post<T>(url: string, body: unknown) {
    const { data } = await axios({
      method: "POST",
      url: `${this._baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: body
    });
    return data as Promise<SuccessAPIResponse<T>>;
  }
}

export const http = new Http();