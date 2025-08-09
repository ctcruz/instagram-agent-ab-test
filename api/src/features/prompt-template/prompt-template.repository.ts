import { Injectable } from '@nestjs/common';
import { IPromptTemplateRepository } from './interfaces/prompt-template.repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PromptTemplate } from './entities/prompt-template.entity';

@Injectable()
export class PrismaPromptTemplateRepository
  implements IPromptTemplateRepository
{
  constructor(private readonly prisma: PrismaService) {}

  // async findMany() {
  //   const arms = await this.prisma.promptTemplate.findMany({
  //     select: { id: true, name: true, alpha: true, beta: true },
  //     orderBy: { createdAt: 'asc' },
  //   });
  // return arms;
  // }

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
