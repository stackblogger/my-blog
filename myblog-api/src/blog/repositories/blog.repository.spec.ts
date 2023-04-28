import { Test, TestingModule } from '@nestjs/testing';
import { BlogRepository } from './blog.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Blog } from '../models/blog.model';

describe('BlogRepository', () => {
  const blog = {
    title: 'sample title',
    slug: 'sample-slug',
    body: 'test',
    author: { name: 'Jameer' }
  };
  let service: BlogRepository;
  let model: Model<Blog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogRepository,
        {
          provide: getModelToken('Blog'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<BlogRepository>(BlogRepository);
    model = module.get<Model<Blog>>(getModelToken('Blog'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return single blog', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(blog)
    } as unknown as Query<Blog, Blog>);
    const blogs = await service.findOne(blog.slug);
    expect(blogs).toMatchObject(blog);
  });

  it('should return all blogs', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      limit: () => ({
        skip: () => ({
          sort: () => ({
            exec: jest.fn().mockResolvedValueOnce(blog)
          })
        })
      })
    } as unknown as Query<Blog[], Blog>);
    const blogs = await service.findAll('', { pageSize: 10, currentPage: 1 });
    expect(blogs).toMatchObject(blog);
  });
});
