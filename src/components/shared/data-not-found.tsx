import { cn } from "@/utils/helpers";

interface DataNotFoundProps {
  className?: string;
}

export default function DataNotFound({ className }: DataNotFoundProps) {
  return (
    <div className={cn("flex flex-col justify-center items-center gap-3 py-10 px-5", className)}>
      <div className="w-max">
        <img
          role="presentation"
          src="/assets/empty.png"
          className="h-10 w-auto"
        />
      </div>
      <p className="text-sm font-geist font-medium leading-[1] text-foreground/60">Data Not Found...</p>
    </div>
  )
}