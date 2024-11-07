"use client";

import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";
import useGetWorkflowsQuery from "@/domain/workflow/use-get-workflows-query";
import WorkflowCard from "./workflow-card";

export default function WorkflowLists() {
  const { data: workflows, isLoading } =  useGetWorkflowsQuery();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Workflows..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {workflows?.map(workflow => (
          <WorkflowCard
            key={workflow.id}
            data={workflow}
          />
        ))}
      </div>
      {!workflows?.length && (
        <DataNotFound className="mt-20" />
      )}
    </>
  )
}