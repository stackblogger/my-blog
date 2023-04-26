import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import getServerConfig from 'src/config/configurations/server.config';

@Module({
  imports: [MongooseModule.forRoot(getServerConfig().database)]
})
export class DbModule {}
