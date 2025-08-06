import { Inject, Injectable } from '@nestjs/common';
import { IAIGateway } from './interfaces/ai.gateway.interface';
import { IContentRepository } from './interfaces/content.repository.interface';
import { Content, ContentType } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject('IAIGateway') private readonly ai: IAIGateway,
    @Inject('IContentRepository') private readonly repo: IContentRepository,
  ) {}

  async generate(prompt: string, type: ContentType): Promise<Content> {
    const optionA = await this.ai.generate(prompt, type);
    const optionB = await this.ai.generate(prompt, type);

    return this.repo.save({
      prompt,
      type,
      optionA,
      optionB,
      selectedOption: null,
    });
  }

  async select(id: string, selected: 'A' | 'B') {
    return this.repo.updateSelection(id, selected);
  }

  async history() {
    return this.repo.findAll();
  }
}
