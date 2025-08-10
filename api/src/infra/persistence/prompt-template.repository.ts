import { Injectable } from '@nestjs/common';

import { PromptTemplate } from '../../domain/entities/prompt-template.entity';
import { IPromptTemplateRepository } from '../../domain/interfaces/prompt-template.repository.interface';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class PrismaPromptTemplateRepository
  implements IPromptTemplateRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PromptTemplate[]> {
    return await this.prisma.promptTemplate.findMany();
  }

  async recordOutcome(winnerId: string, loserId: string): Promise<void> {
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

  async incrementAppearances(templateIds: string[]): Promise<void> {
    await this.prisma.promptTemplate.updateMany({
      where: { id: { in: templateIds } },
      data: { appearances: { increment: 1 } },
    });
  }
}
