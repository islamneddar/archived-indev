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
import LOG from '../../../utils/logger';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {
  FollowSourceBlogRequest,
  GetAllByTypeQueryRequest,
  SourceBlogTypeItemTypeResponse,
} from '@/bussiness/domain-blog/source-blog/source-blog.type';
import {SourceBlogToUserService} from '@/bussiness/domain-blog/source-blog-user/source-blog-user.service';

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
    await this.sourceBlogService.save(sourceBlog);
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
      throw new HttpException(
        'source blog-section not found',
        HttpStatus.NOT_FOUND,
      );
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

  @Get('all-types')
  @UseGuards(AuthGuard)
  async findAllTypes() {
    const allSourceBlogItemTypes: SourceBlogTypeItemTypeResponse[] =
      await this.sourceBlogService.findAllTypes();
    return {
      data: allSourceBlogItemTypes,
    };
  }

  @Get('all-types-v2')
  @UseGuards(AuthGuard)
  async findAllTypesV2() {
    const allSourceBlogItemTypes: SourceBlogTypeItemTypeResponse[] =
      await this.sourceBlogService.findAllTypesV2();
    return {
      data: allSourceBlogItemTypes,
    };
  }

  @Get('all_by_type')
  @UseGuards(AuthGuard)
  async findAllByType(
    @Req() req: Request,
    @Query() pagePaginationDto: PageOptionsDto,
    @Query() getAllByTypeQuery: GetAllByTypeQueryRequest,
  ) {
    const user = req.user;
    const listSourceBlog = await this.sourceBlogService.findAllByType({
      pagePaginationDto: pagePaginationDto,
      typeSource: getAllByTypeQuery.typeSource,
      user: user,
    });
    return {
      ...listSourceBlog,
    };
  }
}
