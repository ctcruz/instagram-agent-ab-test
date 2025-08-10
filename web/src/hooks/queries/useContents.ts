import { useQuery } from "@tanstack/react-query";
import { getHistoryApi } from "@/api/endpoints/content";
import type { Content } from "@/types/content";

export function useHistory() {
  return useQuery<Content[]>({
    queryKey: ["content", "history"],
    queryFn: getHistoryApi,
    staleTime: 30_000,
  });
}
