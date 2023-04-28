import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { CategoryRepository } from '../repositories/category.repository';
import { TagRepository } from '../repositories/tag.repository';
import { BlogRepository } from '../repositories/blog.repository';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: CategoryRepository,
          useValue: {}
        },
        {
          provide: TagRepository,
          useValue: {}
        },
        {
          provide: BlogRepository,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
