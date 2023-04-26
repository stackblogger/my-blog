import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './utils/db.module';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule, DbModule, BlogModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
