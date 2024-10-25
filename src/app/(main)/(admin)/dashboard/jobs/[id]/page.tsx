import CreateJobForm from "@/components/modules/admin/jobs/create-job-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Create Job Post",
  description: "Create a new job post for your company",
};

export default function CreateJobPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const jobId = id == "create" ? null : id;
  
  return (
    <div className="flex-1">
      <CreateJobForm jobId={jobId} />
    </div>
  );
}
