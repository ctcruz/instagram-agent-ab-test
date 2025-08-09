import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { PromptTemplateInsightDto } from './dtos/insights-response.dto';
import { IPromptTemplateRepository } from './interfaces/prompt-template.repository.interface';

type Arm = { id: string; name: string; alpha: number; beta: number };

@Injectable()
export class PromptOptimizerService {
  private readonly EPSILON = 0.1; // 10% explora
  constructor(
    @Inject('PromptTemplateRepository')
    private readonly repo: IPromptTemplateRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getPromptTemplateInsights(): Promise<PromptTemplateInsightDto[]> {
    return this.repo.getPromptTemplateInsights();
  }

  async pickTwo(): Promise<[Arm, Arm]> {
    const arms = await this.prisma.promptTemplate.findMany({
      select: { id: true, name: true, alpha: true, beta: true },
      orderBy: { createdAt: 'asc' },
    });
    if (arms.length < 2) throw new Error('Defina ao menos 2 templates');

    // ε-greedy: às vezes aleatório, senão ordena por win-rate
    const explore = Math.random() < this.EPSILON;
    const sorted = [...arms].sort((a, b) => {
      const wa = a.alpha / (a.alpha + a.beta);
      const wb = b.alpha / (b.alpha + b.beta);
      return wb - wa;
    });

    const pool = explore ? arms : sorted;
    // pegue 2 distintos do topo da lista escolhida
    const first = pool[0];
    const second = pool.find((x) => x.id !== first.id)!;
    return [first, second];
  }

  async recordOutcome(winnerId: string, loserId: string) {
    // winner: alpha++, appearances++ ; loser: beta++, appearances++
    await this.prisma.$transaction([
      this.prisma.promptTemplate.update({
        where: { id: winnerId },
        data: { alpha: { increment: 1 }, appearances: { increment: 1 } },
      }),
      this.prisma.promptTemplate.update({
        where: { id: loserId },
        data: { beta: { increment: 1 }, appearances: { increment: 1 } },
      }),
    ]);
  }

  async touchAppearance(templateIds: string[]) {
    await this.prisma.promptTemplate.updateMany({
      where: { id: { in: templateIds } },
      data: { appearances: { increment: 1 } },
    });
  }
}
