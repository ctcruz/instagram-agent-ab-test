import { IAIGateway } from '../domain/interfaces/ai.gateway.interface';
import { IContentRepository } from '../domain/interfaces/content.repository.interface';
import { Content } from '../domain/entities/content.entity';
import { Inject } from '@nestjs/common';
import { IPromptTemplateRepository } from '../domain/interfaces/prompt-template.repository.interface';
import { PromptOptimizer } from 'src/domain/prompt-optimizer';

export class GenerateContentUseCase {
  private readonly optimizer = new PromptOptimizer();

  constructor(
    @Inject('ContentRepository')
    private readonly contentRepository: IContentRepository,
    @Inject('PromptTemplateRepository')
    private readonly repo: IPromptTemplateRepository,
    @Inject('AIGateway')
    private readonly ai: IAIGateway,
  ) {}

  async execute(input: {
    prompt: string;
    type: 'POST' | 'STORY';
  }): Promise<Content> {
    // get the prompt templates that are being analyzed
    const templates = await this.repo.findAll();

    // choose two “best” templates at the moment
    const [tA, tB] = this.optimizer.pickTwo(templates);

    // generate A/B
    const [optionA, optionB] = await Promise.all([
      this.ai.generate(input.prompt, input.type, tA.systemPrompt),
      this.ai.generate(input.prompt, input.type, tB.systemPrompt),
    ]);

    // records appearance
    await this.repo.incrementAppearances([tA.id, tB.id]);

    return this.contentRepository.save({
      prompt: input.prompt,
      type: input.type,
      optionA,
      optionB,
      selectedOption: null,
      templateAId: tA.id,
      templateBId: tB.id,
    });
  }
}
