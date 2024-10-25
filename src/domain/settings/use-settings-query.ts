import { useQuery } from "@tanstack/react-query";
import { settingsService } from "@/infra/settings/service";

export default function useSettingsQuery() {
  return useQuery({
    queryKey: ["get-settings"],
    queryFn: async () => {
      const data = await settingsService.get();
      return data;
    }
  })
}