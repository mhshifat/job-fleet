import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ISettings } from "./settings";
import { settingsService } from "@/infra/settings/service";

type ResponseType = ISettings;
type RequestType = Partial<ISettings>;

export default function useUpsertSettingsMutation() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const data = await settingsService.upsert(json);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully updated the settings!");
      queryClient.invalidateQueries({ queryKey: ["get-settings"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Something went wrong!");
      } else {
        toast.error(err?.message || "Something went wrong!");
      }
    },
  })
}