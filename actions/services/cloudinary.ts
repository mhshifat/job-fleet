import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.v2.config({
  api_key: process.env.CLOUDENARY_API_KEY,
  api_secret: process.env.CLOUDENARY_API_SECRET,
  cloud_name: process.env.CLOUDENARY_CLOUD_NAME,
})

interface IFileUpload {
  upload(files: File[]): Promise<{
    public_id: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    bytes: number;
    url: string;
    secure_url: string;
    folder: string;
    original_filename: string;
  }[]>;
}

export class FileUploadService implements IFileUpload {
  async upload(files: File[]) {
    const instance = new CloudenaryService();
    return await instance.upload(files);
  } 
}

interface ICloudenaryAsset {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
} 

class CloudenaryService implements IFileUpload {
  async upload(files: File[]) {
    const uploadedResults = [];
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const result = await new Promise<ICloudenaryAsset>((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
          { folder: process.env.CLOUDENARY_FOLDER_NAME, filename_override: file.name },
          (error, result) => {
            if (result) resolve(result as unknown as ICloudenaryAsset);
            else reject(error);
          }
        );
    
        streamifier.createReadStream(Buffer.from(buffer)).pipe(stream);
      });
      const response = {
        public_id: result?.public_id,
        width: result?.width,
        height: result?.height,
        format: result?.format,
        resource_type: result?.resource_type,
        bytes: result?.bytes,
        url: result?.url,
        secure_url: result?.secure_url,
        folder: result?.folder,
        original_filename: result?.original_filename,
      }
      uploadedResults.push(response);
    }
    return uploadedResults;
  } 
}
