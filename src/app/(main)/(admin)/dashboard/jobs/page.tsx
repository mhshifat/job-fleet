import JobLists from "@/components/modules/admin/jobs/job-lists";
import JobsTopActions from "@/components/modules/admin/jobs/jobs-top-actions";

export default function AdminJobsPage() {
  return (
    <div className="p-5">
      <JobsTopActions />
      <JobLists />
    </div>
  )
}