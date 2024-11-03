import { useDialog } from "@/components/providers/dialog";
import Button from "@/components/ui/button";
import ApplicationInfoModal from "./application-info-modal";
import { IApplication } from "@/domain/application/application";

interface ShowApplicationDataBtnWrapperProps {
  data: IApplication;
}

export default function ShowApplicationDataBtnWrapper({ data }: ShowApplicationDataBtnWrapperProps) {
  const { openDialog } = useDialog();

  return (
    <Button variant="secondary-outlined" size="sm" className="max-w-[130px]" onClick={() => openDialog({
      title: "Application Data",
      position: "right",
      content: <ApplicationInfoModal  data={data} />
    })}>Show Data</Button>
  )
}