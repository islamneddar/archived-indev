import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
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
import {FollowSourceBlogRequest} from '@/bussiness/source-blog/source-blog.type';
import {SourceBlogToUserService} from '@/bussiness/source-blog-user/source-blog-user.service';

@Controller('source-blog')
export class SourceBlogController {
  constructor(
    private sourceBlogService: SourceBlogService,
    private sourceBlogToUserService: SourceBlogToUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request) {
    const sourceBlog = req.body as SourceBlogEntity;
    LOG.info(sourceBlog);
    await this.sourceBlogService.save(sourceBlog);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async findAllWithPagination(
    @Req() req: Request,
    @Query() paginationDto: PageOptionsDto,
  ) {
    const user = req.user;
    return await this.sourceBlogService.findAllWithPagination({
      paginationDto: paginationDto,
      user: user,
    });
  }

  @Post('follow')
  @UseGuards(AuthGuard)
  async follow(
    @Req() req: Request,
    @Body() followSourceBlogRequest: FollowSourceBlogRequest,
  ) {
    const sourceBlogId = followSourceBlogRequest.sourceBlogId;
    const user = req.user;
    const isFollow = followSourceBlogRequest.isFollow;
    const sourceBlogExist = await this.sourceBlogService.findById(
      followSourceBlogRequest.sourceBlogId,
    );

    if (!sourceBlogExist) {
      throw new HttpException('source blog not found', HttpStatus.NOT_FOUND);
    }

    const sourceBlogToUserExit =
      await this.sourceBlogToUserService.getByUserIdAndSourceBlogId({
        sourceBlogId: sourceBlogId,
        userId: user.userId,
      });

    if (sourceBlogToUserExit) {
      if (sourceBlogToUserExit.isFollow !== isFollow) {
        await this.sourceBlogToUserService.updateFollow({
          sourceBlogToUser: sourceBlogToUserExit,
          userId: user.userId,
          isFollow: isFollow,
        });
      }
    } else {
      const sourceBlog = await this.sourceBlogService.findById(sourceBlogId);
      await this.sourceBlogToUserService.create({
        sourceBlog: sourceBlog,
        user: user,
        isFollow: isFollow,
      });
    }
    return {
      sourceBlogId: sourceBlogId,
      isFollow: isFollow,
    };
  }
}
