import { useQuery } from "@tanstack/react-query";
import { jobService } from "@/infra/job/service";

export default function useGetMyJobsQuery() {
  return useQuery({
    queryKey: [`get-my-jobs`],
    queryFn: async () => {
      const data = await jobService.myList();
      return data;
    },
  });
}
