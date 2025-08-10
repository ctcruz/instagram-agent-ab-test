import type { Content, GeneratePayload, SelectPayload } from "@/types/content";
import { http } from "../client";

export function generateContentApi(payload: GeneratePayload) {
  return http<Content>("/content/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function selectOptionApi(payload: SelectPayload) {
  return http<{ ok: true }>("/content/select", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function getHistoryApi() {
  return http<Content[]>("/content/history");
}
