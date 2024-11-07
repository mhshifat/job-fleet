"use client";

import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";
import useGetStagesQuery from "@/domain/workflow/use-get-stages-query";
import { useParams } from "next/navigation";
import StageCard from "./stage-card";

export default function StageLists() {
  const { id } = useParams();
  const { data: stages, isLoading } =  useGetStagesQuery({
    workflowId: id
  });

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Stages..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {stages?.map(stage => (
          <StageCard
            key={stage.id}
            data={stage}
          />
        ))}
      </div>
      {!stages?.length && (
        <DataNotFound className="mt-20" />
      )}
    </>
  )
}