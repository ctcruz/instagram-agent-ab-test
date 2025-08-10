import { ContentType, SelectedOption } from '../domain/entities/content.entity';

export class HistoryItemDto {
  id: string;
  prompt: string;
  type: ContentType;
  selectedOption: SelectedOption;
  optionA: { caption: string; hashtags: string[] };
  optionB: { caption: string; hashtags: string[] };
  createdAt: Date;
}
