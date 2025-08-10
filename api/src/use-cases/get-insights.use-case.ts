import { Inject } from '@nestjs/common';
import { IPromptTemplateRepository } from '../domain/interfaces/prompt-template.repository.interface';
import { PromptTemplateInsightDto } from 'src/dtos/insights-response.dto';
import { PromptOptimizer } from 'src/domain/prompt-optimizer';

export class GetInsightsUseCase {
  constructor(
    @Inject('PromptTemplateRepository')
    private readonly promptTemplateRepository: IPromptTemplateRepository,
  ) {}

  async execute(): Promise<PromptTemplateInsightDto[]> {
    const templates = await this.promptTemplateRepository.findAll();

    const insights = templates.map((t) => ({
      ...t,
      winRate: PromptOptimizer.calculateWinRate(t.alpha, t.beta),
    }));

    // Order by winRate desc, then by appearances desc
    return insights.sort((a, b) => PromptOptimizer.sortInsights(a, b));
  }
}
