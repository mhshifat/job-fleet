"use client";

import Container from "@/components/shared/container";
import DataNotFound from "@/components/shared/data-not-found";
import Spinner from "@/components/shared/spinner";
import Button from "@/components/ui/button";
import Editor from "@/components/ui/editor";
import useGetPublicFormQuery from "@/domain/form/use-get-public-form-query";
import useGetPublicJobQuery from "@/domain/job/use-get-public-job-query";
import { formatISODate } from "@/utils/date";
import { HardDriveUploadIcon } from "lucide-react";
import Link from "next/link";

export default function JobDetails({ jobId }: { jobId: string }) {
  const { data, isLoading } = useGetPublicJobQuery(jobId);
  const { data: formData, isLoading: isFormLoading } = useGetPublicFormQuery(data?.formId as string);
  const formElements = JSON.parse(formData?.fields || "[]");  
  // TODO:
  const isAlreadyApplied = false;

  if (isLoading || isFormLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  );
  if (!data || !formData) return <DataNotFound className="mt-20" />;
  return (
    <div>
      <div className="w-full aspect-[1/.25] bg-primary/10" />
      <Container>
        <div className="rounded-lg bg-background shadow-sm relative -mt-24">
          <div className="flex items-start justify-between gap-5 p-5">
            <div className="flex items-start gap-5">
              <div>
                <img
                  src="/assets/logo-icon.png"
                  alt="logo"
                  role="presentation"
                  className="h-[60px]"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-geist font-medium leading-[1] text-foreground">Annon IT</h3>

                <div className="flex flex-col gap-2 mt-3">
                  <p className="text-base font-geist font-medium leading-[1]"><span className="text-foreground/50">Title: </span>{data?.title}</p>
                  <p className="text-base font-geist font-medium leading-[1]"><span className="text-foreground/50">Address: </span>{data?.streetAddress} - {data?.zipCode} - {data?.city} - {data?.country}</p>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              {data?.formId && (
                <Link href={!isAlreadyApplied ? `/jobs/${jobId}/forms/${data?.formId}` : `/jobs/${jobId}`}>
                  <Button disabled={isAlreadyApplied}>
                    <HardDriveUploadIcon className="size-4" />
                    <span>Apply</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="p-5 flex items-start gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Type</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.type}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Vacancy</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.vacancy}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Deadline</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.createdAt ? formatISODate(new Date(data?.createdAt), "do, MMMM yyyy") : "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Level</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.jobLevel}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Experience</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.numOfExperience}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-geist-mono font-medium leading-[1] text-foreground/50">Salary</h3>
              <p className="text-base font-geist font-medium leading-[1] text-foreground">{data?.salaryRange || data?.salaryType}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Editor
            disabled
            className="border-none"
            value={data?.description}
          />
        </div>
      </Container>
    </div>
  )
}