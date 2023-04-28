import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { CategoryRepository } from '../repositories/category.repository';
import { TagRepository } from '../repositories/tag.repository';
import { BlogRepository } from '../repositories/blog.repository';
import { mock, when } from 'ts-mockito';
import { Blog } from '../models/blog.model';
import { User } from 'src/user/models/user.model';
import { Category } from '../models/category.model';
import { Tag } from '../models/tag.model';

const blog = {
  title: 'sample title',
  slug: 'sample-slug',
  body: 'test',
  author: { name: 'Jameer' }
} as Blog;
const authorId = '644af9095fabb9e3d0d76f54';
const user = { name: 'Jameer', _id: authorId } as User;
const category = {
  name: 'NestJs'
} as Category;
const categoryResponse = {
  ...category,
  _id: 'some-id'
} as Category;
const extBlog = {
  ...blog,
  category
} as Blog;
const tag = {
  name: 'programming'
} as Tag;
const tags = [tag] as Tag[];
const completeBlog = {
  ...extBlog,
  tags
} as Blog;

describe('BlogService', () => {
  let service: BlogService;
  let mockedBlogRepo: BlogRepository;
  let mockedCategoryRepo: CategoryRepository;
  let mockedTagRepo: TagRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: CategoryRepository,
          useValue: {
            create: jest.fn().mockImplementation(() => Promise.resolve(categoryResponse))
          }
        },
        {
          provide: TagRepository,
          useValue: {
            create: jest.fn().mockImplementation(() => Promise.resolve(tags))
          }
        },
        {
          provide: BlogRepository,
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve(blog)),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([blog])),
            create: jest.fn().mockImplementation(() => Promise.resolve(extBlog))
          }
        }
      ]
    }).compile();

    service = module.get<BlogService>(BlogService);
    mockedBlogRepo = mock<BlogRepository>();
    mockedCategoryRepo = mock<CategoryRepository>();
    mockedTagRepo = mock<TagRepository>();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get paginated blogs', async () => {
      const pagination = { pageSize: 10, currentPage: 1 };
      when(mockedBlogRepo.findAll(authorId, pagination)).thenResolve([blog]);

      const response = await service.findAll(authorId, pagination);
      expect(response).toMatchObject([blog]);
    });
  });

  describe('findOne', () => {
    it('should get a single blog', async () => {
      when(mockedBlogRepo.findOne(blog.slug)).thenResolve(blog);

      const response = await service.findOne(blog.slug);
      expect(response).toMatchObject(blog);
    });
  });

  describe('create', () => {
    it('should create a new blog without category and tag', async () => {
      when(mockedBlogRepo.create(blog)).thenResolve(blog);

      const response = await service.create(blog, user);
      expect(response.title).toEqual(extBlog.title);
      expect(response.body).toEqual(extBlog.body);
      expect(response.author).toEqual(extBlog.author);
    });
  });

  describe('create', () => {
    it('should create a new blog with category', async () => {
      when(mockedCategoryRepo.create(category)).thenResolve(categoryResponse);
      when(mockedBlogRepo.create(extBlog)).thenResolve(extBlog);

      const response = await service.create(extBlog, user);
      expect(response.title).toEqual(extBlog.title);
      expect(response.category._id).toEqual(categoryResponse._id);
      expect(response.body).toEqual(extBlog.body);
      expect(response.author).toEqual(extBlog.author);
    });
  });

  describe('create', () => {
    it('should create a new blog with category and tag', async () => {
      when(mockedCategoryRepo.create(category)).thenResolve(categoryResponse);
      when(mockedTagRepo.create(tags)).thenResolve(tags);
      when(mockedBlogRepo.create(completeBlog)).thenResolve(completeBlog);

      const response = await service.create(completeBlog, user);
      expect(response.title).toEqual(completeBlog.title);
      expect(response.category._id).toEqual(categoryResponse._id);
      expect(response.body).toEqual(completeBlog.body);
      expect(response.author).toEqual(completeBlog.author);
    });
  });
});
