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
    if (arms.length < 2) throw new Error('Defina ao menos 2 templates');

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

  // Opcional: Métodos para calcular estatísticas (ex: winRate)
  // static calculateWinRate(alpha: number, beta: number): number {
  //   return alpha / (alpha + beta);
  // }

  recordOutcome(winnerId: string, loserId: string): void {
    // Lógica de negócio (sem persistência!)
    // Nota: A persistência real é feita pelo repositório no Use Case
  }
}
