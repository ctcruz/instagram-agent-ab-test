import { Inject, Injectable } from '@nestjs/common';
import { IAIGateway } from './interfaces/ai.gateway.interface';
import { IContentRepository } from './interfaces/content.repository.interface';
import { PromptOptimizerService } from '../prompt-template/prompt-optimizer.service';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @Inject('AIGateway') private readonly ai: IAIGateway,
    @Inject('ContentRepository') private readonly repo: IContentRepository,
    @Inject('PromptOptimizerService')
    private readonly optimizer: PromptOptimizerService,
  ) {}

  async generate(prompt: string, type: 'POST' | 'STORY'): Promise<Content> {
    // choose two “best” templates at the moment
    const [tA, tB] = await this.optimizer.pickTwo();

    // take the systemPrompts
    const [ptA, ptB] = await Promise.all([
      // select only the necessary field
      this.repo.getTemplateById(tA.id),
      this.repo.getTemplateById(tB.id),
    ]);

    // generate A/B
    const [optionA, optionB] = await Promise.all([
      this.ai.generate(prompt, type, ptA.systemPrompt),
      this.ai.generate(prompt, type, ptB.systemPrompt),
    ]);

    // records appearance
    await this.optimizer.touchAppearance([tA.id, tB.id]);

    // save the content with templates Refs
    return this.repo.save({
      prompt,
      type,
      optionA,
      optionB,
      selectedOption: null,
      templateAId: tA.id,
      templateBId: tB.id,
    });
  }

  async select(contentId: string, selected: 'A' | 'B') {
    const content = await this.repo.findById(contentId);
    if (!content || !content.templateAId || !content.templateBId) {
      throw new Error('Content not found or missing templates');
    }

    // updates content
    await this.repo.updateSelection(contentId, selected);

    // winner/loser
    const winner = selected === 'A' ? content.templateAId : content.templateBId;
    const loser = selected === 'A' ? content.templateBId : content.templateAId;

    await this.optimizer.recordOutcome(winner, loser);
  }

  async history() {
    return this.repo.findAll();
  }
}
