import CreateJobForm from "@/components/modules/jobs/create-job-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Create Job Post",
  description: "Create a new job post for your company",
};

export default function CreateJobPage({}:{ params: { id: string } }) {
  return (
    <div className="h-screen flex flex-col flex-1 overflow-hidden">
      <CreateJobForm />
    </div>
  )
}