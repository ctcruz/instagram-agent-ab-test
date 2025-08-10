import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectOptionApi } from "@/api/endpoints/content";
import type { SelectPayload } from "@/types/content";

export function useSelectOption() {
  const qc = useQueryClient();

  return useMutation<{ ok: true }, Error, SelectPayload>({
    mutationFn: selectOptionApi,
    onSuccess: () => {
      // Reload history after saving choice
      qc.invalidateQueries({ queryKey: ["content", "history"] });
    },
  });
}
