import JobDetails from "@/components/modules/web/jobs/job-details";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="pb-20 bg-background-secondary flex-1">
      <JobDetails
        jobId={params.id}
      />
    </div>
  )
}