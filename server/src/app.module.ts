import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ActivityLogModule } from './activity-log/activity-log.module';

@Module({
  imports: [PrismaModule, CategoryModule, ActivityLogModule],
})
export class AppModule {}
