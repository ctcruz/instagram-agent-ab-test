import { PromptOptimizer } from 'src/features/prompt-template/domain/prompt-optimizer';
import { IAIGateway } from '../domain/interfaces/ai.gateway.interface';
import { IContentRepository } from '../domain/interfaces/content.repository.interface';
import { Content } from '../domain/entities/content.entity';
import { IPromptTemplateRepository } from 'src/features/prompt-template/interfaces/prompt-template.repository.interface';
import { Inject } from '@nestjs/common';

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
    // 1. Look for templates (infra)
    const templates = await this.repo.findAll();

    // 2. Choose the best (domain)
    const [tA, tB] = this.optimizer.pickTwo(templates);

    // 3. Generates content (infra)
    const [optionA, optionB] = await Promise.all([
      this.ai.generate(input.prompt, input.type, tA.systemPrompt),
      this.ai.generate(input.prompt, input.type, tB.systemPrompt),
    ]);

    // 4. Save (infra)
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
