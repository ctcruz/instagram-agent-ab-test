import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/features/content/infra/persistence/prisma/prisma.service';
import { Content } from '../../domain/entities/content.entity';
import { PromptTemplate } from '../../../prompt-template/entities/prompt-template.entity';
import { IContentRepository } from '../../domain/interfaces/content.repository.interface';

@Injectable()
export class PrismaContentRepository implements IContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateSelection(id: string, selected: 'A' | 'B'): Promise<void> {
    await this.prisma.content.update({
      data: { selectedOption: selected },
      where: { id },
    });
  }

  async findAll(): Promise<Content[]> {
    const contents = await this.prisma.content.findMany({});

    return contents.map((item) => {
      return new Content(
        item.id,
        item.prompt,
        item.type as 'POST' | 'STORY',
        { caption: item.optionACaption, hashtags: item.optionAHashtags },
        { caption: item.optionBCaption, hashtags: item.optionBHashtags },
        item.selectedOption as 'A' | 'B' | null,
        item.createdAt,
      );
    });
  }

  async findById(id: string): Promise<Content | null> {
    const content = await this.prisma.content.findUnique({
      where: { id: id },
    });

    if (!content) return null;

    return new Content(
      content.id,
      content.prompt,
      content.type as 'POST' | 'STORY',
      { caption: content.optionACaption, hashtags: content.optionAHashtags },
      { caption: content.optionBCaption, hashtags: content.optionBHashtags },
      content.selectedOption as 'A' | 'B' | null,
      content.createdAt,
      content.templateAId,
      content.templateBId,
    );
  }

  async getTemplateById(
    id: string,
  ): Promise<
    Pick<PromptTemplate, 'id' | 'systemPrompt' | 'name' | 'alpha' | 'beta'>
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

  async save(content: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
    const created = await this.prisma.content.create({
      data: {
        prompt: content.prompt,
        type: content.type,
        optionACaption: content.optionA.caption,
        optionAHashtags: content.optionA.hashtags,
        optionBCaption: content.optionB.caption,
        optionBHashtags: content.optionB.hashtags,
        selectedOption: content.selectedOption,
        templateAId: content.templateAId,
        templateBId: content.templateBId,
      },
      include: { templateA: true, templateB: true },
    });

    return new Content(
      created.id,
      created.prompt,
      created.type as 'POST' | 'STORY',
      { caption: created.optionACaption, hashtags: created.optionAHashtags },
      { caption: created.optionBCaption, hashtags: created.optionBHashtags },
      created.selectedOption as 'A' | 'B' | null,
      created.createdAt,
      created.templateAId,
      created.templateBId,
    );
  }
}
