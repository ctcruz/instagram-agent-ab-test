// import { Inject, Injectable } from '@nestjs/common';
// import { IAIGateway } from './interfaces/ai.gateway.interface';
// import { IContentRepository } from './interfaces/content.repository.interface';
// import { PromptOptimizerService } from '../prompt-template/prompt-optimizer.service';
// import { Content } from './entities/content.entity';

// @Injectable()
// export class ContentService {
//   constructor(
//     @Inject('AIGateway') private readonly ai: IAIGateway,
//     @Inject('ContentRepository') private readonly repo: IContentRepository,
//     @Inject('PromptOptimizerService')
//     private readonly optimizer: PromptOptimizerService,
//   ) {}

//   async generate(prompt: string, type: 'POST' | 'STORY'): Promise<Content> {
//     // choose two “best” templates at the moment
//     const [tA, tB] = await this.optimizer.pickTwo();

//     // take the systemPrompts
//     const [ptA, ptB] = await Promise.all([
//       // select only the necessary field
//       this.repo.getTemplateById(tA.id),
//       this.repo.getTemplateById(tB.id),
//     ]);

//     // generate A/B
//     const [optionA, optionB] = await Promise.all([
//       this.ai.generate(prompt, type, ptA.systemPrompt),
//       this.ai.generate(prompt, type, ptB.systemPrompt),
//     ]);

//     // records appearance
//     await this.optimizer.touchAppearance([tA.id, tB.id]);

//     // save the content with templates Refs
//     return this.repo.save({
//       prompt,
//       type,
//       optionA,
//       optionB,
//       selectedOption: null,
//       templateAId: tA.id,
//       templateBId: tB.id,
//     });
//   }

//   async select(contentId: string, selected: 'A' | 'B') {
//     const content = await this.repo.findById(contentId);
//     if (!content || !content.templateAId || !content.templateBId) {
//       throw new Error('Content not found or missing templates');
//     }

//     // updates content
//     await this.repo.updateSelection(contentId, selected);

//     // winner/loser
//     const winner = selected === 'A' ? content.templateAId : content.templateBId;
//     const loser = selected === 'A' ? content.templateBId : content.templateAId;

//     await this.optimizer.recordOutcome(winner, loser);
//   }

//   async history() {
//     return this.repo.findAll();
//   }
// }

import { Inject, Injectable } from '@nestjs/common';
import { GenerateContentUseCase } from '../use-cases/generate-content.use-case';
import { SelectContentUseCase } from '../use-cases/select-content.use-case';
import { IContentRepository } from '../domain/interfaces/content.repository.interface';
import { Content } from '../domain/entities/content.entity';
import { PromptTemplateInsightDto } from 'src/features/content/dtos/insights-response.dto';
import { GetInsightsUseCase } from '../use-cases/get-insights.use-case';

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
