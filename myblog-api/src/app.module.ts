import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
