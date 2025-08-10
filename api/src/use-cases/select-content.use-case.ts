import { PromptOptimizer } from 'src/domain/prompt-optimizer';
import { IContentRepository } from '../domain/interfaces/content.repository.interface';
import { Inject } from '@nestjs/common';

export class SelectContentUseCase {
  private readonly optimizer = new PromptOptimizer();

  constructor(
    @Inject('ContentRepository')
    private readonly contentRepository: IContentRepository,
  ) {}

  async execute(input: {
    contentId: string;
    selected: 'A' | 'B';
  }): Promise<void> {
    const content = await this.contentRepository.findById(input.contentId);
    if (!content?.templateAId || !content?.templateBId) {
      throw new Error('Invalid Content');
    }

    await this.contentRepository.updateSelection(
      input.contentId,
      input.selected,
    );

    const winner =
      input.selected === 'A' ? content.templateAId : content.templateBId;
    const loser =
      input.selected === 'A' ? content.templateBId : content.templateAId;

    // Calls the domain optimizer directly (doesn't need service)
    // this.optimizer.recordOutcome(winner, loser); // Simulated method in the domain
  }
}
