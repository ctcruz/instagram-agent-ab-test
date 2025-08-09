import { useMutation } from "@tanstack/react-query";
import { generateContent } from "../../api/endpoints/contentApi";
import type { GenerateContentDTO } from "@/types/content";

export const useGenerateContent = () => {
  return useMutation({
    mutationFn: (data: GenerateContentDTO) => generateContent(data),
    onSuccess(data) {
      return data?.data;
    },
  });
};
