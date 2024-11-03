import { applicationService } from "@/infra/application/service";
import { useQuery } from "@tanstack/react-query";
import { IApplication } from "./application";

export default function useGetApplicationsQuery({ ...args }: Partial<IApplication>) {
  return useQuery({
    queryKey: [`get-applications-by-${JSON.stringify({
      ...args,
    })}`],
    queryFn: async () => {
      const data = await applicationService.findBy({ ...args });
      return data;
    },
  });
}
