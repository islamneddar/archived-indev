import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {Request} from 'express';
import {BlogService} from './blog.service';
import {PageOptionsDto} from '@/common/pagination/page_option.dto';
import {
  GetBlogBySearchAndFeedTypeRequest,
  GetBlogBySearchRequest,
  UpdateLikeToBlogRequest,
} from './blog.proto';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {BlogToUserService} from '@/bussiness/blog-user/blog-user.service';

@Controller('blogs')
export default class BlogController {
  private readonly LOG = new Logger(BlogController.name);

  constructor(
    private blogService: BlogService,
    private blogToUserService: BlogToUserService,
  ) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getWithPaginate(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.blogService.getWithPaginate(pageOptionsDto);
  }

  @Get('/test')
  @HttpCode(HttpStatus.OK)
  async test(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.blogService.getWithPaginateQuery({
      pageOptionsDto: pageOptionsDto,
    });
  }

  /*@Get('/by-feed-type')
  @HttpCode(HttpStatus.OK)
  async getWithPaginateByFeedType(
    @Query() getBlogsByFeedTypeRequest: BlogByFeedTypeRequest,
  ) {
    const {pageOption, feedType} = getBlogsByFeedTypeRequest;
    return this.blogService.getWithPaginateByFeedType(pageOption, feedType);
  }*/

  /**
   * @deprecated
   */
  @Get('/deprecated/search')
  async getBlogsWithSearch(@Query() getBlogBySearch: GetBlogBySearchRequest) {
    this.LOG.debug(getBlogBySearch.search);
    const {pageOption} = getBlogBySearch;
    const {search} = getBlogBySearch;
    return this.blogService.getWithPaginateBySearch(pageOption, search);
  }

  @Get('/search')
  async getBlogWithSearchAndType(
    @Query() getBlogRequest: GetBlogBySearchAndFeedTypeRequest,
  ) {
    this.LOG.debug('get blog with search and type');
    const {pageOption} = getBlogRequest;
    const {search} = getBlogRequest;
    const {feedType} = getBlogRequest;
    if (pageOption === undefined) {
      throw new HttpException(
        'Argument Failed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (search === undefined || search === null || search.length === 0) {
      throw new HttpException(
        'search query is empty',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.blogService.getAllPaginateWithSearchAndFeedType(
      pageOption,
      search,
      feedType,
    );
  }

  @Post('like')
  @UseGuards(AuthGuard)
  async likeBlog(@Req() req: Request, @Body() body: UpdateLikeToBlogRequest) {
    const blogId = body.blogId;
    const blogExist = await this.blogService.getById({
      blogId: blogId,
    });

    if (!blogExist) {
      throw new HttpException('blog not found', HttpStatus.NOT_FOUND);
    }

    const user = req.user;

    const blogToUserExist = await this.blogToUserService.getByBlogIdAndUserId({
      blogId: blogId,
      userId: user.userId,
    });

    const isLiked = body.isLiked;
    if (blogToUserExist) {
      await this.blogToUserService.updateLike({
        blogToUser: blogToUserExist,
        isLiked: isLiked,
      });
    } else {
      await this.blogToUserService.create({
        blog: blogExist,
        user: user,
        isLiked: isLiked,
      });
    }

    return {
      blogId: blogId,
      isLiked: isLiked,
    };
  }
}
