import { useQuery } from "@tanstack/react-query";
import { automationService } from "@/infra/automation/service";

export default function useGetAutomationQuery(id: string | null) {
  return useQuery({
    queryKey: [`get-automation-by-id-${id}`],
    queryFn: async () => {
      if (id == null) return null;
      const data = await automationService.getById(id);
      return data;
    },
    enabled: !!id
  });
}
