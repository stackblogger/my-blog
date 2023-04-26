import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import getServerConfig from './config/configurations/server.config';

@Module({
  imports: [ConfigurationModule, MongooseModule.forRoot(getServerConfig().database), BlogModule]
})
export class AppModule {}
