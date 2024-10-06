import CreateJobForm from "@/components/modules/jobs/create-job-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Create Job Post",
  description: "Create a new job post for your company",
};

export default function CreateJobPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const jobId = id == "create" ? null : id;
  
  return (
    <div className="h-screen flex flex-col flex-1 overflow-hidden">
      <CreateJobForm jobId={jobId} />
    </div>
  );
}
