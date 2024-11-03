import { applicationService } from "@/infra/application/service";
import { useQuery } from "@tanstack/react-query";
import { IApplication } from "./application";

export default function useGetPublicApplicationsQuery({ ...args }: Partial<IApplication>) {
  return useQuery({
    queryKey: [`get-public-applications-by-${JSON.stringify({
      ...args,
    })}`],
    queryFn: async () => {
      const data = await applicationService.findBy({ public: "true", ...args });
      return data;
    },
  });
}
