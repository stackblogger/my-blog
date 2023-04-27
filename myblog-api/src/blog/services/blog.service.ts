import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository, ICategoryRepository } from '../repositories/category.repository';
import { ITagRepository, TagRepository } from '../repositories/tag.repository';
import { BlogRepository, IBlogRepository } from '../repositories/blog.repository';
import { Blog } from '../models/blog.model';

export interface IBlogService {
  create(blog: Blog): Promise<Blog>;
}

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject(CategoryRepository) private readonly categoryRepo: ICategoryRepository,
    @Inject(TagRepository) private readonly tagRepo: ITagRepository,
    @Inject(BlogRepository) private readonly blogRepo: IBlogRepository
  ) {}

  async create(blog: Blog): Promise<Blog> {
    return await this.blogRepo.create(blog);
  }
}
