import axios from 'axios';

export interface IHttp {
  post<T>(url: string, body: unknown): Promise<T>;
}

class Http implements IHttp {
  private _baseUrl = ""

  async post<T>(url: string, body: unknown) {
    const { data } = await axios({
      method: "POST",
      url: `${this._baseUrl}${url}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: body
    });
    return data as unknown as T;
  }
}

export const http = new Http();