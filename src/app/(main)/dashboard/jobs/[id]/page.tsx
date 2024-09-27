import CreateJobForm from "@/components/modules/jobs/create-job-form";

export default function CreateJobPage({}:{ params: { id: string } }) {
  return (
    <div className="py-10">
      <CreateJobForm />
    </div>
  )
}