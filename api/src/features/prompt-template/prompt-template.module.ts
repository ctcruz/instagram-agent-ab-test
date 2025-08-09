import { Module } from '@nestjs/common';
import { PromptOptimizerService } from './prompt-optimizer.service';
import { PrismaPromptTemplateRepository } from './prompt-template.repository';

@Module({
  providers: [
    PromptOptimizerService,
    PrismaPromptTemplateRepository,
    // {
    //   provide: 'IPromptTemplateRepository',
    //   useClass: PrismaPromptTemplateRepository,
    // },
  ],
  exports: [PromptOptimizerService],
})
export class PromptTemplateModule {}
