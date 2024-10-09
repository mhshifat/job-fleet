import { useQuery } from "@tanstack/react-query";
import { formService } from "@/infra/form/service";

export default function useGetMyFormsQuery() {
  return useQuery({
    queryKey: [`get-my-forms`],
    queryFn: async () => {
      const data = await formService.myList();
      return data;
    },
  });
}
