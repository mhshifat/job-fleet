import AutomationLists from "@/components/modules/admin/automations/automation-lists";
import AutomationsTopActions from "@/components/modules/admin/automations/automations-top-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet",
  description: "",
};

export default function AutomationsPage() {
  return (
    <div className="p-5">
      <AutomationsTopActions />
      <AutomationLists />
    </div>
  )
}