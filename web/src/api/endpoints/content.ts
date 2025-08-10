import type { Content, GeneratePayload, SelectPayload } from "@/types/content";
import { http } from "../client";

export function generateContentApi(payload: GeneratePayload) {
  return http<Content>("/api/content/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function selectOptionApi({ id, selected }: SelectPayload) {
  return http<{ ok: true }>(`/api/content/${id}/select`, {
    method: "POST",
    body: JSON.stringify({ selected }),
  });
}

export function getHistoryApi() {
  return http<Content[]>("/api/content/history");
}
