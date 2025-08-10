import { Module } from '@nestjs/common';
import { ContentModule } from './content.module';
import { PrismaModule } from './infra/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ContentModule],
})
export class AppModule {}
