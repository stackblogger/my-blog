import { Controller, Get, Post, Body, Param, Inject, UseGuards, Req, Query } from '@nestjs/common';
import { BlogService, IBlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { AuthGuard } from '@nestjs/passport';
import { IUserService, UserService } from '../../user/services/user.service';
import { Pagination } from '../models/pagination.model';

@Controller('blogs')
export class BlogController {
  constructor(
    @Inject(BlogService) private readonly blogService: IBlogService,
    @Inject(UserService) private readonly userService: IUserService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() pagination: Pagination, @Req() req): Promise<Blog[]> {
    return this.blogService.findAll(req.user.userId, pagination);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Blog> {
    return this.blogService.findOne(slug);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() blog: Blog, @Req() req): Promise<Blog> {
    const user = await this.userService.findOne(req.user.userId);
    return this.blogService.create(blog, user);
  }
}
