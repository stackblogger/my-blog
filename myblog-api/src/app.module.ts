import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './utils/db.module';
import getServerConfig from './config/db.config';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [getServerConfig] }), AuthModule, DbModule, BlogModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
