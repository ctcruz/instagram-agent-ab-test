import { Module } from '@nestjs/common';
import { ContentController } from './infra/http/content.controller';
import { ContentService } from './application/content.service';
import { PrismaContentRepository } from './infra/persistence/content.repository';
import { GenerateContentUseCase } from './use-cases/generate-content.use-case';
import { SelectContentUseCase } from './use-cases/select-content.use-case';
import { PrismaPromptTemplateRepository } from './infra/persistence/prompt-template.repository';
import { OpenAIGateway } from './infra/gateway/openai.gateway';
import { GetInsightsUseCase } from './use-cases/get-insights.use-case';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    GenerateContentUseCase,
    GetInsightsUseCase,
    SelectContentUseCase,
    {
      provide: 'PromptTemplateRepository',
      useClass: PrismaPromptTemplateRepository,
    },
    {
      provide: 'ContentRepository',
      useClass: PrismaContentRepository,
    },
    {
      provide: 'AIGateway',
      useClass: OpenAIGateway,
    },
  ],
})
export class ContentModule {}
