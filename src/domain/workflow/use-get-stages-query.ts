import { useQuery } from "@tanstack/react-query";
import { stageService } from "@/infra/stage/service";

export default function useGetStagesQuery(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: [`get-stages` + JSON.stringify(query)],
    queryFn: async () => {
      const data = await stageService.list(query);
      return data;
    },
  });
}
