import type {
  Content,
  GenerateContentDTO,
  SelectedOptionDTO,
} from "@/types/content";
import { apiClient } from "../client";

export const getHistory = () => apiClient.get<Content[]>(`/content/history`);
export const generateContent = (data: GenerateContentDTO) =>
  apiClient.post<Content>("/content/generate", data);
export const selectOption = (data: SelectedOptionDTO) =>
  apiClient.put("/content/select", data);
