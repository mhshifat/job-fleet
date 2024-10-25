import { useQuery } from "@tanstack/react-query";
import { formService } from "@/infra/form/service";

export default function useGetMyFormsQuery(query?: Record<string, unknown>) {
  return useQuery({
    queryKey: [`get-my-forms` + JSON.stringify(query)],
    queryFn: async () => {
      const data = await formService.myList(query);
      return data;
    },
  });
}
