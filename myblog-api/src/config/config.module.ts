import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import getServerConfig from './configurations/server.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({}), MongooseModule.forRoot(getServerConfig().database), AuthModule]
})
export class ConfigurationModule {}
