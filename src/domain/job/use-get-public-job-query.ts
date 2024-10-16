import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/infra/job/service";

export default function useGetPublicJobQuery(jobId: string | null) {
  return useQuery({
    queryKey: [`get-public-job-by-id-${jobId}`],
    queryFn: async () => {
      if (jobId == null) return null;
      const data = await jobService.getById(jobId, {
        public: "true"
      });
      return data;
    },
  });
}
