import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, ICategoryRepository } from '../repositories/category.repository';
import { ITagRepository, TagRepository } from '../repositories/tag.repository';
import { BlogRepository, IBlogRepository } from '../repositories/blog.repository';
import { Blog } from '../models/blog.model';
import { User } from 'src/user/models/user.model';
import { ConvertToSlug } from '../utils/helper';

export interface IBlogService {
  create(blog: Blog, user: User): Promise<Blog>;
}

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject(CategoryRepository) private readonly categoryRepo: ICategoryRepository,
    @Inject(TagRepository) private readonly tagRepo: ITagRepository,
    @Inject(BlogRepository) private readonly blogRepo: IBlogRepository
  ) {}

  async create(blog: Blog, user: User): Promise<Blog> {
    blog.author = user;
    blog.timestamp = new Date();
    blog.slug = ConvertToSlug(blog.title);
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
