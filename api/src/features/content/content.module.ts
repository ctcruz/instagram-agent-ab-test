import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaContentRepository } from './content.repository';
import { OpenAIGateway } from './ai.gateway';
import { PromptOptimizerService } from '../prompt-template/prompt-optimizer.service';
import { PrismaPromptTemplateRepository } from '../prompt-template/prompt-template.repository';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    PromptOptimizerService,
    PrismaContentRepository,
    OpenAIGateway,
    {
      provide: 'ContentRepository',
      useClass: PrismaContentRepository,
    },
    {
      provide: 'PromptTemplateRepository',
      useClass: PrismaPromptTemplateRepository,
    },
    {
      provide: 'PromptOptimizerService',
      useClass: PromptOptimizerService,
    },
    {
      provide: 'AIGateway',
      useClass: OpenAIGateway,
    },
  ],
})
export class ContentModule {}
