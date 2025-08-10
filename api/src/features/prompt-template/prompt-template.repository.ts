import { Injectable } from '@nestjs/common';
import { IPromptTemplateRepository } from './interfaces/prompt-template.repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PromptTemplate } from './entities/prompt-template.entity';

@Injectable()
export class PrismaPromptTemplateRepository
  implements IPromptTemplateRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async getPromptTemplateInsights() {
    const rows = await this.prisma.promptTemplate.findMany({
      select: {
        id: true,
        name: true,
        alpha: true,
        beta: true,
        appearances: true,
      },
    });

    const insights = rows.map((r) => {
      const denom = r.alpha + r.beta;
      const winRate = denom > 0 ? r.alpha / denom : 0;
      return {
        id: r.id,
        name: r.name,
        alpha: r.alpha,
        beta: r.beta,
        appearances: r.appearances,
        winRate,
      };
    });

    // Order by winRate desc, then by appearances desc
    insights.sort((a, b) => {
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      return b.appearances - a.appearances;
    });

    return insights;
  }

  async getTemplateById(
    id: string,
  ): Promise<
    Pick<PromptTemplate, 'id' | 'name' | 'systemPrompt' | 'alpha' | 'beta'>
  > {
    const res = await this.prisma.promptTemplate.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        systemPrompt: true,
        name: true,
        alpha: true,
        beta: true,
      },
    });
    return res;
  }
}
