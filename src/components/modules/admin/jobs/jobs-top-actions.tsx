import Button from "@/components/ui/button";
import { ROUTE_PATHS } from "@/utils/constants";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function JobsTopActions() {
  return (
    <div className="flex items-center gap-5">
      <h3 className="text-2xl font-geist font-medium text-foreground/80 leading-[1]">My Jobs</h3>

      <div className="ml-auto">
        <Link href={ROUTE_PATHS.DASHBOARD_JOB_CREATE}>
          <Button size="sm">
            <PlusIcon className="size-4" />

            <span>Create Job</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}