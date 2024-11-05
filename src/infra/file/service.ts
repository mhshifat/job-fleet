import { http, IHttp } from "@/utils/http";
import { INewApplicationPayload } from "@/domain/application/application";
import { IFileDto } from "./dto";
import { fileDtoListToFileList, fileDtoToFile } from "./transform";

class FileService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewApplicationPayload) {
    const res = await this._http.post<IFileDto>("/files", values);
    if (!res.success) throw new Error(res.message);
    return fileDtoToFile(res.data);
  }

  async findBy(params: Record<string, unknown> = {}) {
    const res = await this._http.get<IFileDto[]>(`/files`, { params });
    if (!res.success) throw new Error(res.message);
    return fileDtoListToFileList(res.data);
  }
}

export const fileService = new FileService(http);
