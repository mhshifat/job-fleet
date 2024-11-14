import { useQuery } from "@tanstack/react-query";
import { integrationService } from "@/infra/integration/service";

export default function useGetIntegrationsQuery(query?: Record<string, unknown>, options?: { enabled: boolean }) {
  return useQuery({
    queryKey: [`get-integrations` + JSON.stringify(query)],
    queryFn: async () => {
      const data = await integrationService.list(query);
      return data;
    },
    ...options?.enabled !== undefined?{enabled: options?.enabled}:{}
  });
}
