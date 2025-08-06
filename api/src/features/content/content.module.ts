import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaContentRepository } from './content.repository';
import { OpenAIGateway } from './ai.gateway';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    PrismaContentRepository,
    OpenAIGateway,
    {
      provide: 'IContentRepository',
      useClass: PrismaContentRepository,
    },
    {
      provide: 'IAIGateway',
      useClass: OpenAIGateway,
    },
  ],
})
export class ContentModule {}
