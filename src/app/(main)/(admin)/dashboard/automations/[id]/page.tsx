import AutomationBuilderWrapper from "@/components/modules/admin/automations/automation-builder-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet",
  description: "",
};

export default function AutomationBuilderPage() {
  return (
    <div className="w-full flex flex-col flex-1">
      <AutomationBuilderWrapper />
    </div>
  )
}