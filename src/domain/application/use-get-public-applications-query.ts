import { applicationService } from "@/infra/application/service";
import { useQuery } from "@tanstack/react-query";
import { IApplication } from "./application";

export default function useGetPublicApplicationsQuery({ ...args }: Partial<IApplication>, { enabled, onSuccess }: { onSuccess?: (data: IApplication[]) => void; enabled?: boolean } = { enabled: true }) {
  return useQuery({
    queryKey: [`get-public-applications-by-${JSON.stringify({
      ...args,
    })}`],
    queryFn: async () => {
      const data = await applicationService.findBy({ public: "true", ...args });
      onSuccess?.(data);
      return data;
    },
    enabled
  });
}
