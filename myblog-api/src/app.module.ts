import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule, BlogModule]
})
export class AppModule {}
