"use client";

import useGetMyJobsQuery from "@/domain/job/use-get-my-jobs-query";
import JobCard from "./job-card";
import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";

export default function JobLists() {
  const { data: jobs, isLoading } =  useGetMyJobsQuery();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Jobs..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {jobs?.map(job => (
          <JobCard
            key={job.id}
            data={job}
          />
        ))}
      </div>
      {!jobs?.length && (
        <DataNotFound className="mt-20" />
      )}
    </>
  )
}