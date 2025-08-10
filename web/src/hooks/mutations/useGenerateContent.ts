import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateContentApi } from "@/api/endpoints/content";
import type { GeneratePayload, Content } from "@/types/content";

export function useGenerateContent() {
  const qc = useQueryClient();

  return useMutation<{ data: Content }, Error, GeneratePayload>({
    mutationFn: async (payload) => {
      const data = await generateContentApi(payload);
      return { data };
    },
    onSuccess: () => {
      // Reload history after saving choice
      qc.invalidateQueries({ queryKey: ["content", "history"] });
    },
  });
}
