import { Test, TestingModule } from '@nestjs/testing';
import { BlogRepository } from './blog.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('BlogRepository', () => {
  let service: BlogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogRepository,
        {
          provide: getModelToken('Blog'),
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<BlogRepository>(BlogRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
