import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/features/content/infra/persistence/prisma/prisma.service';
import { PromptTemplate } from '../../domain/entities/prompt-template.entity';
import { IPromptTemplateRepository } from '../../domain/interfaces/prompt-template.repository.interface';

@Injectable()
export class PrismaPromptTemplateRepository
  implements IPromptTemplateRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PromptTemplate[]> {
    return await this.prisma.promptTemplate.findMany();
  }

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
