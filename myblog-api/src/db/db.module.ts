import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from 'src/config/db.config';

@Module({
  imports: [MongooseModule.forRoot(dbConfig.database)]
})
export class DbModule {}
