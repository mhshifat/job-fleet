import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/infra/job/service";

export default function useGetJobQuery(jobId: string | null) {
  return useQuery({
    queryKey: [`get-job-by-id-${jobId}`],
    queryFn: async () => {
      if (jobId == null) return null;
      const data = await jobService.getJobById(jobId);
      
      return data; //object
    },
  });
}
