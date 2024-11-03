import JsonView from '@uiw/react-json-view';
import { IApplication } from "@/domain/application/application";

interface ApplicationInfoModalProps {
  data: IApplication;
}

export default function ApplicationInfoModal({ data }: ApplicationInfoModalProps) {
  return (
    <div className="w-full">
      <JsonView
        value={data?.record || {}}
      />
    </div>
  )
}