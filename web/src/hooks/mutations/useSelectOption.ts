import { useMutation } from "@tanstack/react-query";
import { selectOption } from "../../api/endpoints/contentApi";
import type { SelectedOptionDTO } from "@/types/content";

export const useSelectOption = () => {
  return useMutation({
    mutationFn: (data: SelectedOptionDTO) => selectOption(data),
    onSuccess(data) {
      return data?.data;
    },
  });
};
