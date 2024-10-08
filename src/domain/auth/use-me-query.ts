import { useQuery } from "@tanstack/react-query";
import { authService } from "@/infra/auth/service";

export default function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const data = await authService.getMe();
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false
  })
}