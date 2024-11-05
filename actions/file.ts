"use server";

import { db } from "../db/drizzle";
import { createId } from "@/utils/helpers";
import { files } from "../db/schema/file";
import { FileUploadService } from "./services/cloudinary";
import { IFileDtoPayload } from "@/infra/file/dto";

const fileMap = {
  id: files.id,
  public_id: files.public_id,
  width: files.width,
  height: files.height,
  format: files.format,
  resource_type: files.resource_type,
  bytes: files.bytes,
  url: files.url,
  secure_url: files.secure_url,
  folder: files.folder,
  original_filename: files.original_filename,
  created_at: files.created_at,
  updated_at: files.updated_at,
};

export async function uploadFiles(files: File[], orgId?: string) {
  const fileUploadSer = new FileUploadService();
  const uploadedFiles = await fileUploadSer.upload(files);
  const results = await Promise.all(
    uploadedFiles.map(file => createFile({
      ...file, 
      ...orgId?{org_id: orgId}:{}
    }))
  );
  
  return results;
}

export async function createFile(values: IFileDtoPayload & { org_id?: string }, trx = db) {
  const [data] = await trx
    .insert(files)
    .values({
      id: createId(),
      ...values,
      created_at: new Date(),
    })
    .returning(fileMap);
  
  return data;
}