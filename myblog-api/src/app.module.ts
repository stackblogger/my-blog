import { Module } from '@nestjs/common';
import { DbModule } from './utils/db.module';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule, DbModule, BlogModule]
})
export class AppModule {}
