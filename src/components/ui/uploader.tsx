"use client";

import { FileTextIcon, ImageUpIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../shared/spinner";
import { cn } from "@/utils/helpers";
import axios from "axios";
import { fileDtoListToFileList } from "@/infra/file/transform";
import { IFileDto } from "@/infra/file/dto";

interface IUploaderFile {
  name: string;
  size: number;
  progress: number;
  url?: string;
}

interface UploaderProps {
  disabled?: boolean;
  type?: "list" | "single";
  onChange?: (values: IUploaderFile[]) => void;
  value?: IUploaderFile[];
  className?: string;
  accepted?: string;
}

export default function Uploader({ type = "list", className, value, disabled, onChange, accepted }: UploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<IUploaderFile[]>([]);

  useEffect(() => {
    if (!value) return;
    setFiles(value);
  }, [value])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setLoading(true);
    setFiles(values => [
      ...values,
      ...acceptedFiles.map((item, idx) => ({
        name: item.name,
        size: item.size,
        progress: 10 * idx,
      }))
    ]);
    try {
      const formdata = new FormData();
      acceptedFiles.map(file => {
        formdata.append("file", file, file.name);
      });
      const uploadRes = await axios<{ data: IFileDto[] }>({
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/files`,
        data: formdata
      });
      const data = fileDtoListToFileList(uploadRes.data.data);
      setFiles(() => {
        const values: IUploaderFile[] = data.map(item => ({
          name: `${item.originalFilename}.${item.format}`,
          progress: 100,
          size: item.bytes,
          url: `${item.url}?publicId=${item.publicId}&filename=${`${item.originalFilename}.${item.format}`}`
        }));
        setTimeout(() => {
          onChange?.(values);
        }, 0);
        return values;
      })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: type === 'list'
  });
  
  switch (type) {
    case "single":
      return (
        <div className={cn("transition flex flex-col gap-3 border-2 border-dashed border-border rounded-md p-5 bg-border/20", className, {
          "border-primary": isDragActive
        })} {...getRootProps()}>
          <input {...getInputProps({
            disabled: disabled || uploading
          })} />

          {!files.length && (
            <Uploader.Placeholder
              isDragActive={isDragActive}
              accepted={accepted}
            />
          )}
    
          {(uploading || !!files.length) && (
            <>
              <div className="w-full relative overflow-hidden rounded-md flex items-center gap-5">
                {files[0]?.progress >= 100 ? (
                  <>
                    {files[0]?.name?.endsWith("pdf") ? (
                      <FileTextIcon className="w-10 h-10" />
                    ) : (
                      <img
                        src={files[0]?.url || ""}
                        alt=""
                        role="presentation"
                        className="rounded-md overflow-hidden object-cover border-border border w-10 h-10"
                      />
                    )}
                    <span className="text-sm font-geist font-medium">{files[0].name}</span>
                    <div className="ml-auto" onClick={(e) => {
                      e.stopPropagation();
                      setFiles([]);
                    }}>
                      <Trash2Icon className="size-4 text-danger cursor-pointer" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-full h-full">
                      <Spinner showTitle size="layout" variant="secondary" title="Uploading..." />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )
    case "list":
      return (
        <div className={cn("transition flex flex-col gap-3 border-2 border-dashed border-border rounded-md p-5 bg-border/20", className, {
          "border-primary": isDragActive
        })} {...getRootProps()}>
          <input {...getInputProps({
            disabled: disabled || uploading
          })} multiple />

          {!files.length && (
            <Uploader.Placeholder
              isDragActive={isDragActive}
              accepted={accepted}
            />
          )}
    
          {(uploading || !!files.length) && (
            <>
              {loading && (
                <div className="flex items-center justify-center">
                  <Spinner showTitle size="layout" variant="secondary" title="Uploading..." />
                </div>
              )}
              <ul className="list-none p-0 flex flex-col gap-4 w-full h-full overflow-y-auto">
                {files.map((file, fileIdx) => (
                  <Fragment key={file.name}>
                    {file?.progress >= 100 ? (
                      <li className="flex flex-row gap-2 items-center">
                        <Image
                          src={file?.url || ""}
                          alt=""
                          role="presentation"
                          width={30}
                          height={30}
                          className="rounded-md overflow-hidden object-cover border-border border w-[30px] h-[30px]"
                        />
                        <div className="flex items-center gap-1">
                          <p className="m-0 text-foreground text-sm font-medium font-archivo flex items-center justify-between gap-5 flex-1 lowercase">
                            <span>{file.name?.toLowerCase()}</span>
                          </p>
                        </div>
                        <div className="ml-auto" onClick={(e) => {
                          e.stopPropagation();
                          setFiles(values => values?.filter((_, idx) => idx !== fileIdx));
                        }}>
                          <Trash2Icon className="size-4 text-danger cursor-pointer" />
                        </div>
                      </li>
                    ) : (
                      <li className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <ImageUpIcon className="size-4 text-foreground" />
                          <p className="m-0 text-foreground text-sm font-medium font-archivo flex items-center justify-between gap-5 flex-1 lowercase">
                            <span>{file.name?.toLowerCase()}</span>
                            <span>{file?.size}</span>
                          </p>
                        </div>
                        <div className="h-2 rounded-full bg-border overflow-hidden">
                          <span className={cn("flex h-full bg-foreground")} style={{
                            width: `${file.progress}%`
                          }} />
                        </div>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </>
          )}
        </div>
      )
  }
}

Uploader.Placeholder = ({
  isDragActive,
  accepted
}: {
  isDragActive: boolean;
  accepted?: string;
}) => {
  return (
    <div className="group cursor-pointer min-h-20 flex flex-col gap-4 items-center justify-center">
      <div className="relative">
        <Image
          src="/svg/file.svg"
          alt=""
          role="presentation"
          className={cn("transition size-12 text-border absolute bottom-0 origin-bottom group-hover:rotate-[-20deg] group-hover:translate-x-[-10px] group-hover:translate-y-2 z-0", {
            "rotate-[-20deg] translate-x-[-10px] translate-y-2": isDragActive
          })}
          width={70}
          height={70}
        />
        <Image
          src="/svg/file.svg"
          alt=""
          role="presentation"
          className="transition size-12 text-border relative z-10"
          width={70}
          height={70}
        />
        <Image
          src="/svg/file.svg"
          alt=""
          role="presentation"
          className={cn("transition size-12 text-border absolute bottom-0 origin-bottom group-hover:rotate-[20deg] group-hover:translate-x-[10px] group-hover:translate-y-2 z-0", {
            "rotate-[20deg] translate-x-[10px] translate-y-2": isDragActive
          })}
          width={70}
          height={70}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        {isDragActive ? (
          <p className="text-sm font-medium font-archivo text-foreground/70">Drop your files here</p>
        ) : (
          <p className="text-sm font-medium font-archivo text-foreground/70">Drag & Drop files or <span className="text-primary underline underline-offset-2 font-semibold">click here</span> to upload files.</p>
        )}
        <p className="text-sm font-medium font-archivo text-foreground/70">{accepted || "PNG, JPG, JPEG"}</p>
      </div>
    </div>
  )
}