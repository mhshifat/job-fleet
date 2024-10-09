import Button from "@/components/ui/button";
import { IJob } from "@/domain/job/job";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function JobCard({ data }: { data: IJob }) {
  return (
    <div className="border-[5px] border-background rounded-lg overflow-hidden shadow-sm ring-1 ring-background-secondary">
      <div className="aspect-square w-full bg-primary/10 rounded-tl-md rounded-tr-md py-4 px-5 flex flex-col">
        <div className="flex items-center gap-5 justify-between">
          <small className="text-sm font-geist-mono font-medium">{data?.salaryRange} {data?.currency}</small>

          <Button variant="ghost" size="icon">
            <Trash2Icon className="size-5" />
          </Button>
        </div>
        <div className="flex-1 flex items-center">
          <h3 className="text-3xl font-geist-mono font-semibold max-w-[95%]">{data?.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-between bg-background pt-7 pb-[calc(1.75rem-5px)] px-3">
        <h3 className="text-lg tracking-tighter font-geist-mono font-semibold leading-[1] text-foreground/80">{data?.type} ({data?.jobPlace})</h3>

        <Link href={`/dashboard/jobs/${data.id}`}>
          <Button className="rounded-full">View</Button>
        </Link>
      </div>
    </div>
  )
}