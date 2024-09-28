import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/infra/category/service";

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await categoryService.list();
      return data;
    }
  })
}