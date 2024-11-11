import { useQuery } from "@tanstack/react-query";
import { automationService } from "@/infra/automation/service";

export default function useGetAutomationsQuery(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: [`get-automations` + JSON.stringify(query)],
    queryFn: async () => {
      const data = await automationService.list(query);
      return data;
    },
  });
}
