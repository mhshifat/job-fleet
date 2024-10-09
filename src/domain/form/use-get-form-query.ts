import { useQuery } from "@tanstack/react-query";
import { formService } from "@/infra/form/service";

export default function useGetFormQuery(id: string | null) {
  return useQuery({
    queryKey: [`get-form-by-id-${id}`],
    queryFn: async () => {
      if (id == null) return null;
      const data = await formService.getById(id);
      return data;
    },
  });
}
