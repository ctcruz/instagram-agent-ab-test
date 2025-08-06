import { Module } from '@nestjs/common';
import { ContentModule } from './features/content/content.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ContentModule],
})
export class AppModule {}
