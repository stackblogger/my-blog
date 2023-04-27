import { Controller, Get, Post, Body, Param, Inject, UseGuards, Req } from '@nestjs/common';
import { BlogService, IBlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { AuthGuard } from '@nestjs/passport';
import { IUserService, UserService } from 'src/user/services/user.service';

@Controller('blogs')
export class BlogController {
  constructor(
    @Inject(BlogService) private readonly blogService: IBlogService,
    @Inject(UserService) private readonly userService: IUserService
  ) {}

  //   @Get()
  //   @UseGuards(AuthGuard('jwt'))
  //   async findAll(): Promise<Blog[]> {
  //     return this.blogService.findAll();
  //   }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string): Promise<User> {
  //     return this.userService.findOne(id);
  //   }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() blog: Blog, @Req() req): Promise<Blog> {
    debugger;
    const user = await this.userService.findOne(req.user.userId);
    return this.blogService.create(blog, user);
  }
}