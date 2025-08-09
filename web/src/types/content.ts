export type ContentType = "POST" | "STORY";

export type GenerateContentDTO = {
  prompt: string;
  type: ContentType;
};

export type SelectedOption = "A" | "B";

export type Option = {
  caption: string;
  hashtags: string[];
};

export type OptionResponse = {
  optionA: Option;
  optionB: Option;
};

export type Content = {
  id: string;
  prompt: string;
  type: ContentType;
  optionA: Option;
  optionB: Option;
  selectedOption: SelectedOption;
  createdAt: Date;
  templateAId: string;
  templateBId: string;
};

export type SelectedOptionDTO = {
  id: string;
  selected: SelectedOption;
};
