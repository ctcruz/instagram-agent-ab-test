import { Inject, Injectable } from '@nestjs/common';
import { GenerateContentUseCase } from '../use-cases/generate-content.use-case';
import { SelectContentUseCase } from '../use-cases/select-content.use-case';
import { IContentRepository } from '../domain/interfaces/content.repository.interface';
import { Content } from '../domain/entities/content.entity';

import { GetInsightsUseCase } from '../use-cases/get-insights.use-case';
import { PromptTemplateInsightDto } from 'src/dtos/insights-response.dto';

@Injectable()
export class ContentService {
  constructor(
    private readonly generateContentUseCase: GenerateContentUseCase,
    private readonly selectContentUseCase: SelectContentUseCase,
    private readonly getInsightsUseCase: GetInsightsUseCase,
    @Inject('ContentRepository') private readonly repo: IContentRepository,
  ) {}

  async generate(prompt: string, type: 'POST' | 'STORY'): Promise<Content> {
    return this.generateContentUseCase.execute({ prompt, type });
  }

  async select(contentId: string, selected: 'A' | 'B'): Promise<void> {
    await this.selectContentUseCase.execute({ contentId, selected });
  }

  async history() {
    return this.repo.findAll();
  }

  async insights(): Promise<PromptTemplateInsightDto[]> {
    return this.getInsightsUseCase.execute();
  }
}
