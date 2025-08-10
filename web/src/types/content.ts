// export type ContentType = "POST" | "STORY";

// export type GenerateContentDTO = {
//   prompt: string;
//   type: ContentType;
// };

// export type SelectedOption = "A" | "B";

// export type Option = {
//   caption: string;
//   hashtags: string[];
// };

// export type OptionResponse = {
//   optionA: Option;
//   optionB: Option;
// };

// export type Content = {
//   id: string;
//   prompt: string;
//   type: ContentType;
//   optionA: Option;
//   optionB: Option;
//   selectedOption: SelectedOption;
//   createdAt: Date;
//   templateAId: string;
//   templateBId: string;
// };

// export type SelectedOptionDTO = {
//   id: string;
//   selected: SelectedOption;
// };

// src/types/content.ts
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
