export type ContentType = 'POST' | 'STORY';
export type SelectedOption = 'A' | 'B' | null;

export class Content {
  constructor(
    public id: string,
    public prompt: string,
    public type: ContentType,
    public optionA: { caption: string; hashtags: string[] },
    public optionB: { caption: string; hashtags: string[] },
    public selectedOption: SelectedOption,
    public createdAt: Date,
  ) {}
}
