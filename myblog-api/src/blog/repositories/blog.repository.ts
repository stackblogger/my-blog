import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../models/blog.model';

export interface IBlogRepository {
  findOne(slug: string): Promise<Blog>;
  findAll(): Promise<Blog[]>;
  create(blog: Blog): Promise<Blog>;
}

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async findOne(slug: string): Promise<Blog> {
    return await this.blogModel.findOne({ slug }).exec();
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  async create(blog: Blog): Promise<Blog> {
    const createdBlog = new this.blogModel(blog);
    return await createdBlog.save();
  }
}
