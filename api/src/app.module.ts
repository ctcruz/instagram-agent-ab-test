import { Module } from '@nestjs/common';
import { ContentModule } from './features/content/content.module';
import { PrismaModule } from './features/content/infra/persistence/prisma/prisma.module';
import { PromptTemplateModule } from './features/prompt-template/prompt-template.module';

@Module({
  imports: [PrismaModule, ContentModule, PromptTemplateModule],
})
export class AppModule {}
