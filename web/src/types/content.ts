export type ContentType = "POST" | "STORY";
export type AB = "A" | "B";

export interface ContentOption {
  caption: string;
  hashtags: string[];
}

export interface Content {
  id: string;
  prompt: string;
  type: ContentType;
  optionA: ContentOption;
  optionB: ContentOption;
  selectedOption: AB | null;
  createdAt: string; // ISO
}

export interface GeneratePayload {
  prompt: string;
  type: ContentType;
}

export interface SelectPayload {
  id: string;
  selected: AB;
}
