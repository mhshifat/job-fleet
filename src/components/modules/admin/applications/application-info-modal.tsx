import JsonView from '@uiw/react-json-view';
import { IApplication } from "@/domain/application/application";
import Tab from '@/components/ui/tab';
import { cn } from '@/utils/helpers';
import { BracesIcon, FileTextIcon } from 'lucide-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DataNotFound from '@/components/shared/data-not-found';

const pdfVersion = "3.11.174"
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`

interface ApplicationInfoModalProps {
  data: IApplication;
}

export default function ApplicationInfoModal({ data }: ApplicationInfoModalProps) {
  return (
    <div className="w-full">
      <Tab className="flex flex-col h-full">
        <div className="mb-5">
          <Tab.List
            className="flex items-center bg-foreground/10 rounded-lg p-1 [&>*]:flex-1"
            renderItem={({ content, isSelected }) => (
              <span className={cn("w-full flex justify-center items-center font-medium text-foreground text-sm gap-1 bg-transparent rounded-md cursor-pointer py-1 px-3", {
                "bg-background": isSelected
              })}>
                {content}
              </span>
            )}
          />
        </div>

        <Tab.Item>
          <Tab.Trigger>
            <BracesIcon className="size-4 text-current" />
            JSON
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            <JsonView
              value={data?.record || {}}
            />
          </Tab.Content>
        </Tab.Item>
        <Tab.Item>
          <Tab.Trigger>
            <FileTextIcon className="size-4 text-current" />
            PDF
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            {data["record"]?.resume && (
              <Worker workerUrl={pdfWorkerUrl}>
                <Viewer
                  fileUrl={data["record"]?.resume}
                  plugins={[]}
                />
              </Worker>
            )}
            {!data["record"]?.resume && (
              <DataNotFound className="mt-20" />
            )}
          </Tab.Content>
        </Tab.Item>
      </Tab>
    </div>
  )
}