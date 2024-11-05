import { IFile } from "@/domain/file/file";
import { IFileDto } from "./dto";

export function fileDtoToFile(values: IFileDto): IFile {
  return {
    id: values.id,
    bytes: values.bytes,
    folder: values.folder,
    format: values.format,
    height: values.height,
    originalFilename: values.original_filename,
    publicId: values.public_id,
    resourceType: values.resource_type,
    secureUrl: values.secure_url,
    url: values.url,
    width: values.width,
    createdAt: values.created_at,
  }
}

export function fileToFileDto(values: IFile): IFileDto {
  return {
    id: values.id,
    bytes: values.bytes,
    folder: values.folder,
    format: values.format,
    height: values.height,
    original_filename: values.originalFilename,
    public_id: values.publicId,
    resource_type: values.resourceType,
    secure_url: values.secureUrl,
    url: values.url,
    width: values.width,
    created_at: values.createdAt,
  }
}

export function fileDtoListToFileList(values: IFileDto[]): IFile[] {
  return values.map(item => fileDtoToFile(item))
}