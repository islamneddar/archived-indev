import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {Request} from 'express';
import {SourceBlogService} from './source_blog.service';
import {SourceBlogEntity} from './source_blog.entity';
import LOG from '../../utils/logger';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';

@Controller('source-blog')
export class SourceBlogController {
  constructor(private sourceBlogSource: SourceBlogService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request) {
    const sourceBlog = req.body as SourceBlogEntity;
    LOG.info(sourceBlog);
    await this.sourceBlogSource.save(sourceBlog);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async findAllWithPagination(@Query() paginationDto: PageOptionsDto) {
    console.log(JSON.stringify(paginationDto));
    return await this.sourceBlogSource.findAllWithPagination(paginationDto);
  }
}
