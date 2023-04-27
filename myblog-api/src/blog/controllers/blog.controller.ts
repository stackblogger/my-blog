import { Controller, Get, Post, Body, Param, Inject, UseGuards } from '@nestjs/common';
import { BlogService, IBlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogController {
  constructor(@Inject(BlogService) private readonly blogService: IBlogService) {}

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
  async create(@Body() blog: Blog): Promise<Blog> {
    return this.blogService.create(blog);
  }
}
