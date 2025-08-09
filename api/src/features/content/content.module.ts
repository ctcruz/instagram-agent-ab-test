import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaContentRepository } from './content.repository';
import { OpenAIGateway } from './ai.gateway';
import { PromptOptimizerService } from '../prompt-template/prompt-optimizer.service';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    PromptOptimizerService,
    PrismaContentRepository,
    OpenAIGateway,
    {
      provide: 'IContentRepository',
      useClass: PrismaContentRepository,
    },
    {
      provide: 'IPromptOptimizerService',
      useClass: PromptOptimizerService,
    },
    {
      provide: 'IAIGateway',
      useClass: OpenAIGateway,
    },
  ],
})
export class ContentModule {}
