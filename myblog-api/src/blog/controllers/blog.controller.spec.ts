import { Test, TestingModule } from '@nestjs/testing';
import { when, mock } from 'ts-mockito';
import { UserService } from '../../user/services/user.service';
import { BlogController } from './blog.controller';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { User } from 'src/user/models/user.model';

const blog = {
  title: 'sample title',
  slug: 'sample-slug',
  body: 'test',
  author: { name: 'Jameer' }
};
const authorId = '644af9095fabb9e3d0d76f54';
const user = { name: 'Jameer', _id: authorId };
const authenticatedReq = { user: { userId: authorId } };

describe('BlogController', () => {
  let controller: BlogController;
  let mockedBlogService: BlogService;
  let mockedUserService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve(blog)),
            findAll: jest.fn().mockImplementation(() => Promise.resolve([blog])),
            create: jest.fn().mockImplementation(() => Promise.resolve(blog))
          }
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve(user))
          }
        }
      ]
    }).compile();

    controller = module.get<BlogController>(BlogController);
  });

  beforeAll(() => {
    mockedBlogService = mock<BlogService>();
    mockedUserService = mock<UserService>();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get paginated blogs', async () => {
      const pagination = { pageSize: 10, currentPage: 1 };
      when(mockedBlogService.findAll(authorId, pagination)).thenResolve([blog] as Blog[]);

      const response = await controller.findAll(pagination, authenticatedReq);
      expect(response).toMatchObject([blog]);
    });
  });

  describe('findOne', () => {
    it('should find a blog by slug', async () => {
      when(mockedBlogService.findOne(blog.slug)).thenResolve(blog as Blog);

      const response = await controller.findOne(blog.slug);
      expect(response).toMatchObject(blog);
    });
  });

  describe('create', () => {
    it('should create a new blog', async () => {
      when(mockedUserService.findOne(authorId)).thenResolve(user as User);
      const userResponse = await mockedUserService.findOne(authorId);
      when(mockedBlogService.create(blog as Blog, userResponse)).thenResolve(blog as Blog);

      const response = await controller.create(blog as Blog, authenticatedReq);
      expect(response).toMatchObject(blog);
    });
  });
});
