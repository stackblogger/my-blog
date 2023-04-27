import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, ICategoryRepository } from '../repositories/category.repository';
import { ITagRepository, TagRepository } from '../repositories/tag.repository';
import { BlogRepository, IBlogRepository } from '../repositories/blog.repository';
import { Blog } from '../models/blog.model';
import { User } from 'src/user/models/user.model';

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
    return await this.blogRepo.create(blog);
  }
}
