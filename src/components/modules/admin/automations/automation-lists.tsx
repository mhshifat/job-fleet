"use client";

import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";
import useGetAutomationsQuery from "@/domain/automation/use-get-automations-query";
import AutomationCard from "./automation-card";

export default function AutomationLists() {
  const { data: automations, isLoading } =  useGetAutomationsQuery();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Automations..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {automations?.map(automation => (
          <AutomationCard
            key={automation.id}
            data={automation}
          />
        ))}
      </div>
      {!automations?.length && (
        <DataNotFound className="mt-20" />
      )}
    </>
  )
}