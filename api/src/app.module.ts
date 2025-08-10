import { Module } from '@nestjs/common';
import { ContentModule } from './features/content/content.module';
import { PrismaModule } from './features/content/infra/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ContentModule],
})
export class AppModule {}
