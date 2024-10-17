"use client";

import DataNotFound from "@/components/shared/data-not-found";
import Spinner from "@/components/shared/spinner";
import Select from "@/components/ui/select";
import useGetFormQuery from "@/domain/form/use-get-form-query";
import useGetMyJobsQuery from "@/domain/job/use-get-my-jobs-query";
import { cn } from "@/utils/helpers";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function RecordLists() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { data: formData, isLoading } = useGetFormQuery(id as string);
  const { data: jobs, isLoading: isJobsLoading } =  useGetMyJobsQuery();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const selectedJob = useMemo(() => {
    return jobs?.find(j => j.id === selectedJobId);
  }, [selectedJobId, jobs])
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    if (!jobId) return;
    setSelectedJobId(jobId);
  }, [jobId])

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Forms..." className="gap-3" />
    </div>
  );
  
  return (
    <div className="mt-10 w-full px-5">
      <div className="mb-5 w-full flex items-center justify-start">
        <div className="max-w-80">
          <Select
            disabled={isJobsLoading}
            value={[{ content: selectedJob?.title || "", value: selectedJob?.id || "" }]}
            onChange={(values) => setSelectedJobId(values[0].value)}
            placeholder={isJobsLoading ? "Loading..." : "Select a Job"}
          >
            {jobs?.map(j => (
              <Select.Option key={j.id} value={j.id}>{j.title}</Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Object.keys((formData?.records[selectedJobId as keyof typeof formData["records"]] as unknown[])?.[0] || {}).map(key => (
              <th key={key}>
                <span className="text-left w-full flex items-center py-2 px-5 uppercase text-sm font-geist-mono font-medium leading-[1] text-foreground/80">{key}</span>
              </th>
            ))}
          </tr>
        </thead>
        {selectedJobId && <tbody>
          {(Object.values(formData?.records || {}) as any)?.[0].map((item: any, idx: number, arr: any[]) => (
            <tr key={"RecordLists_" + idx} className="bg-background-secondary">
              {Object.keys(item).map((key, keyIdx, keyArr) => (
                <td key={key + idx} className={cn("", {
                  "rounded-tl-lg overflow-hidden": idx === 0 && keyIdx === 0,
                  "rounded-tr-lg overflow-hidden": idx === (arr.length - 1) && keyIdx === (keyArr.length - 1),
                  "rounded-bl-lg overflow-hidden": idx === (arr.length - 1) && keyIdx === 0,
                  "rounded-br-lg overflow-hidden": idx === (arr.length - 1) && keyIdx === (keyArr.length - 1),
                })}>
                  <span className="text-left w-full flex items-center py-3 px-5 text-sm font-geist text-foreground/80">{item[key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>}
      </table>
      {!selectedJobId && (
        <DataNotFound className="mt-20" />
      )}
    </div>
  )
}