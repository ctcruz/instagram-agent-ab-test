import { PromptTemplateInsightDto } from 'src/features/content/dtos/insights-response.dto';

// type Arm = { id: string; alpha: number; beta: number };
type Arm = {
  id: string;
  name: string;
  alpha: number;
  beta: number;
  systemPrompt: string;
};

export class PromptOptimizer {
  private readonly EPSILON = 0.1;

  pickTwo(arms: Arm[]): [Arm, Arm] {
    if (arms.length < 2) throw new Error('Set at least 2 templates');

    const explore = Math.random() < this.EPSILON;
    const sorted = [...arms].sort((a, b) => {
      const wa = a.alpha / (a.alpha + a.beta);
      const wb = b.alpha / (b.alpha + b.beta);
      return wb - wa;
    });

    const pool = explore ? arms : sorted;
    const first = pool[0];
    const second = pool.find((x) => x.id !== first.id)!;
    return [first, second];
  }

  static calculateWinRate(alpha: number, beta: number): number {
    const denom = alpha + beta;
    return denom > 0 ? alpha / denom : 0;
  }

  static sortInsights(
    a: PromptTemplateInsightDto,
    b: PromptTemplateInsightDto,
  ): number {
    if (b.winRate !== a.winRate) return b.winRate - a.winRate;
    return b.appearances - a.appearances;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recordOutcome(winnerId: string, loserId: string): void {
    // Lógica de negócio (sem persistência!)
    // Nota: A persistência real é feita pelo repositório no Use Case
  }
}
