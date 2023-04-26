import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import getServerConfig, { ServerConfigs } from 'src/config/db.config';

@Module({
  imports: [MongooseModule.forRoot(getServerConfig().database)]
})
export class DbModule {
  constructor(private readonly configService: ConfigService) {
    const dd = this.configService.get<ServerConfigs>('database');
    console.log('getServerConfig().database', getServerConfig().database);
    console.log(dd);
  }
}
