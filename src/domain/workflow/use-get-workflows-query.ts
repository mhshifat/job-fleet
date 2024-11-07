import { useQuery } from "@tanstack/react-query";
import { workflowService } from "@/infra/workflow/service";

export default function useGetWorkflowsQuery(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: [`get-workflows` + JSON.stringify(query)],
    queryFn: async () => {
      const data = await workflowService.list(query);
      return data;
    },
  });
}
