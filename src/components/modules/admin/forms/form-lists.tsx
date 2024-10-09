"use client";

import Spinner from "@/components/shared/spinner";
import DataNotFound from "@/components/shared/data-not-found";
import FormCard from "./form-card";
import useGetMyFormsQuery from "@/domain/form/use-get-my-forms-query";

export default function FormLists() {
  const { data: forms, isLoading } =  useGetMyFormsQuery();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Forms..." className="gap-3" />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 mt-10">
        {forms?.map(form => (
          <FormCard
            key={form.id}
            data={form}
          />
        ))}
      </div>
      {!forms?.length && (
        <DataNotFound className="mt-20" />
      )}
    </>
  )
}