import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../features/content/infra/persistence/prisma/prisma.service';
import { PromptOptimizer } from '../../features/prompt-template/domain/prompt-optimizer';
import { IPromptTemplateRepository } from '../../features/prompt-template/interfaces/prompt-template.repository.interface';

type Arm = {
  id: string;
  name: string;
  alpha: number;
  beta: number;
  systemPrompt: string;
};

@Injectable()
export class PromptOptimizerService {
  private readonly optimizer = new PromptOptimizer();

  constructor(
    private readonly prisma: PrismaService,
    @Inject('PromptTemplateRepository')
    private readonly repo: IPromptTemplateRepository,
  ) {}

  async pickTwo(): Promise<[Arm, Arm]> {
    const arms = await this.prisma.promptTemplate.findMany({
      select: {
        id: true,
        alpha: true,
        beta: true,
        name: true,
        systemPrompt: true,
      },
    });
    return this.optimizer.pickTwo(arms); // Delegate to domain
  }

  async recordOutcome(winnerId: string, loserId: string) {
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
}
