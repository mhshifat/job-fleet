"use client";

import { ImageUpIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "../shared/spinner";
import { cn } from "@/utils/helpers";

interface IUploaderFile {
  name: string;
  size: number;
  progress: number;
  url?: string;
}

interface UploaderProps {
  type?: "list" | "single";
  onChange?: (values: IUploaderFile[]) => void;
  value?: IUploaderFile[];
  className?: string;
}

export default function Uploader({ type = "list", className, value }: UploaderProps) {
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
      // TODO:
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
            disabled: uploading
          })} />

          {!files.length && (
            <Uploader.Placeholder
              isDragActive={isDragActive}
            />
          )}
    
          {(uploading || !!files.length) && (
            <>
              <div className="w-full relative overflow-hidden rounded-md">
                {files[0]?.progress >= 100 ? (
                  <>
                    <Image
                      src={files[0]?.url || ""}
                      alt=""
                      fill
                      role="presentation"
                      className="rounded-md overflow-hidden object-cover border-border border w-full h-fuw-full"
                    />
                    <div className="ml-auto absolute top-5 right-5" onClick={(e) => {
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
            disabled: uploading
          })} multiple />

          {!files.length && (
            <Uploader.Placeholder
              isDragActive={isDragActive}
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
  isDragActive
}: {
  isDragActive: boolean;
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
        <p className="text-sm font-medium font-archivo text-foreground/70">PNG, JPG, JPEG</p>
      </div>
    </div>
  )
}