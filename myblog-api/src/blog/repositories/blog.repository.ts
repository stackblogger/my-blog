import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../models/blog.model';
import { Pagination } from '../models/pagination.model';

export interface IBlogRepository {
  findOne(slug: string): Promise<Blog>;
  findAll(author: string, pagination: Pagination): Promise<Blog[]>;
  create(blog: Blog): Promise<Blog>;
}

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async findOne(slug: string): Promise<Blog> {
    return await this.blogModel.findOne({ slug }).exec();
  }

  async findAll(author: string, pagination: Pagination): Promise<Blog[]> {
    pagination.currentPage = pagination.currentPage || 1;
    pagination.currentPage -= 1;
    return await this.blogModel
      .find({ 'author._id': author })
      .limit(pagination.pageSize)
      .skip(pagination.currentPage * pagination.pageSize)
      .sort({ timestamp: -1 })
      .exec();
  }

  async create(blog: Blog): Promise<Blog> {
    const createdBlog = new this.blogModel(blog);
    return await createdBlog.save();
  }
}
