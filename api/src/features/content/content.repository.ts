import { Injectable } from '@nestjs/common';
import { IContentRepository } from './interfaces/content.repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { Content } from './entities/content.entity';

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

  async save(content: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
    console.log(content.optionA.hashtags);
    const created = await this.prisma.content.create({
      data: {
        prompt: content.prompt,
        type: content.type,
        optionACaption: content.optionA.caption,
        optionAHashtags: content.optionA.hashtags,
        optionBCaption: content.optionB.caption,
        optionBHashtags: content.optionB.hashtags,
        selectedOption: content.selectedOption,
      },
    });

    return new Content(
      created.id,
      created.prompt,
      created.type as 'POST' | 'STORY',
      { caption: created.optionACaption, hashtags: created.optionAHashtags },
      { caption: created.optionBCaption, hashtags: created.optionBHashtags },
      created.selectedOption as 'A' | 'B' | null,
      created.createdAt,
    );
  }
}
