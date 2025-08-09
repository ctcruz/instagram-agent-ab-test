export class PromptTemplateInsightDto {
  id: string;
  name: string;
  alpha: number; // wins
  beta: number; // losses
  appearances: number;
  winRate: number; // 0..1
}
