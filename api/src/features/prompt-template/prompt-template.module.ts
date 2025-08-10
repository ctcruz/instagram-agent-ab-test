import { Module } from '@nestjs/common';
import { PromptOptimizerService } from './prompt-optimizer.service';
import { PrismaPromptTemplateRepository } from './prompt-template.repository';
import { PromptTemplateController } from './prompt-template.controller';

@Module({
  controllers: [PromptTemplateController],
  providers: [
    PromptOptimizerService,
    {
      provide: 'IPromptTemplateRepository',
      useClass: PrismaPromptTemplateRepository,
    },
  ],
  exports: ['IPromptTemplateRepository'],
})
export class PromptTemplateModule {}
