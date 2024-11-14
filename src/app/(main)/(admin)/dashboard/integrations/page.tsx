import IntegrationLists from "@/components/modules/admin/integrations/integration-lists";
import IntegrationsTopActions from "@/components/modules/admin/integrations/integrations-top-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet",
  description: "",
};

export default function IntegrationsPage() {
  return (
    <div className="p-5">
      <IntegrationsTopActions />
      <IntegrationLists />
    </div>
  )
}