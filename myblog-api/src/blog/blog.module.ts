import { Module } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { TagRepository } from './repositories/tag.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { TagSchema } from './schemas/tag.schema';
import { BlogRepository } from './repositories/blog.repository';
import { BlogSchema } from './schemas/blog.schema';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    UserModule
  ],
  controllers: [BlogController],
  providers: [CategoryRepository, TagRepository, BlogRepository, BlogService]
})
export class BlogModule {}
