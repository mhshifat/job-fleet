"use client";

import DataNotFound from "@/components/shared/data-not-found";
import Spinner from "@/components/shared/spinner";
import Select from "@/components/ui/select";
import { IApplication } from "@/domain/application/application";
import useGetApplicationsQuery from "@/domain/application/use-get-applications-query";
import useGetMyJobsQuery from "@/domain/job/use-get-my-jobs-query";
import { cn } from "@/utils/helpers";
import { useParams, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import ShowApplicationDataBtnWrapper from "./show-application-data-btn-wrapper";

const tableHeaders = [
  {
    title: "Full Name",
    key: (data: IApplication) => `${data?.candidate?.firstName} - ${data?.candidate?.lastName}`
  },
  {
    title: "Email",
    key: (data: IApplication) => `${data?.candidate?.email}`
  },
  {
    title: "",
    key: (data: IApplication) => <ShowApplicationDataBtnWrapper data={data} />,
    align: "right"
  },
]

export default function ApplicationContainer() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { data: jobs, isLoading: isJobsLoading } =  useGetMyJobsQuery();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { data: applications, isLoading: isApplicationsLoading } = useGetApplicationsQuery({
    jobId: selectedJobId || "",
  });
  const selectedJob = useMemo(() => {
    return jobs?.find(j => j.id === selectedJobId);
  }, [selectedJobId, jobs])
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    if (!jobId) return;
    setSelectedJobId(jobId);
  }, [jobId])

  console.log({ applications });
  if (isApplicationsLoading) return (
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
            {tableHeaders.map(heading => (
              <th key={heading.title}>
                  <span className="text-left w-full flex items-center py-2 px-5 uppercase text-sm font-geist-mono font-medium leading-[1] text-foreground/80">
                    <p>{heading.title}</p>
                  </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications?.map((application, idx, arr) => (
            <tr key={"RecordLists_" + application.id} className="bg-background-secondary">
              {tableHeaders.map((heading, headingIdx, headingArr) => (
                <td key={idx + heading.title} className={cn("", {
                  "rounded-tl-lg overflow-hidden": idx === 0 && headingIdx === 0,
                  "rounded-tr-lg overflow-hidden": idx === (arr.length - 1) && headingIdx === (headingArr.length - 1),
                  "rounded-bl-lg overflow-hidden": idx === (arr.length - 1) && headingIdx === 0,
                  "rounded-br-lg overflow-hidden": idx === (arr.length - 1) && headingIdx === (headingArr.length - 1),
                })}>
                  <span className={cn("text-left w-full flex items-center py-3 px-5 text-sm font-geist text-foreground/80", {
                    "justify-end": heading.align === "right"
                  })}>
                    {(typeof heading?.key === 'string' ? application?.[heading.key as keyof typeof application] : heading.key?.(application)) as ReactNode}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!selectedJobId || !applications?.length && (
        <DataNotFound className="mt-20" />
      )}
    </div>
  )
}