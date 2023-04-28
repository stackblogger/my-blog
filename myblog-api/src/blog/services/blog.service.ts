import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, ICategoryRepository } from '../repositories/category.repository';
import { ITagRepository, TagRepository } from '../repositories/tag.repository';
import { BlogRepository, IBlogRepository } from '../repositories/blog.repository';
import { Blog } from '../models/blog.model';
import { User } from '../../user/models/user.model';
import { ConvertToSlug, RandomString } from '../utils/helper';
import { Pagination } from '../models/pagination.model';

export interface IBlogService {
  findOne(slug: string): Promise<Blog>;
  findAll(author: string, pagination: Pagination): Promise<Blog[]>;
  create(blog: Blog, user: User): Promise<Blog>;
}

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject(CategoryRepository) private readonly categoryRepo: ICategoryRepository,
    @Inject(TagRepository) private readonly tagRepo: ITagRepository,
    @Inject(BlogRepository) private readonly blogRepo: IBlogRepository
  ) {}

  async findOne(slug: string): Promise<Blog> {
    return await this.blogRepo.findOne(slug);
  }

  async findAll(author: string, pagination: Pagination): Promise<Blog[]> {
    return await this.blogRepo.findAll(author, pagination);
  }

  async create(blog: Blog, user: User): Promise<Blog> {
    blog.author = user;
    blog.timestamp = new Date();
    blog.slug = ConvertToSlug(blog.title) + '-' + RandomString(10);
    if (blog.category) {
      blog.category.slug = ConvertToSlug(blog.category.name);
      const category = await this.categoryRepo.create(blog.category);
      blog.category = category;
    }
    if (blog.tags && blog.tags.length > 0) {
      for (let i = 0; i < blog.tags.length; i++) {
        blog.tags[i].slug = ConvertToSlug(blog.tags[i].name);
      }
      const tags = await this.tagRepo.create(blog.tags);
      blog.tags = tags;
    }
    return await this.blogRepo.create(blog);
  }
}
