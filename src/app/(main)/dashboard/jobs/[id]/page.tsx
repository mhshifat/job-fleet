import CreateJobForm from "@/components/modules/jobs/create-job-form";

export default function CreateJobPage({}:{ params: { id: string } }) {
  return (
    <div className="h-screen flex flex-col flex-1 overflow-hidden">
      <CreateJobForm />
    </div>
  )
}