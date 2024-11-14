"use client";

import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";
import useGetIntegrationsQuery from "@/domain/integration/use-get-integrations-query";
import IntegrationCard from "./integration-card";

const INTEGRATIONS = [
  {
    id: "1",
    type: "google_meet",
    title: "Google Meet",
    description: "Connect to your google meet",
  }
]

export default function IntegrationLists() {
  const { data: integrations, isLoading } =  useGetIntegrationsQuery();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Integrations..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {INTEGRATIONS?.map(integration => (
          <IntegrationCard
            key={integration.id}
            data={{
              ...integration,
              connected: integrations?.some(int => int.type === integration.type) || false
            }}
          />
        ))}
      </div>
    </>
  )
}