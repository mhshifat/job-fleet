export interface IFile {
  id: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  url: string;
  secureUrl: string;
  folder: string;
  originalFilename: string;
  createdAt: Date;
}

export type INewFilePayload = Omit<IFile, "id" | "createdAt">;