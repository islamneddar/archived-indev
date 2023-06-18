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
  GetAllBookmarksWithPaginationQuery,
  GetBlogBySearchAndFeedTypeRequest,
  GetBlogsForSourceBlogRequest,
  UpdateBookmarkToBlogRequest,
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

  @Get('/test')
  @HttpCode(HttpStatus.OK)
  async test(@Query() pageOptionsDto: PageOptionsDto) {
    return {
      message: 'test',
    };
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getWithPaginate(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.blogService.getAllWithPaginate(pageOptionsDto);
  }

  @Get('all/with-auth')
  @UseGuards(AuthGuard)
  async getWithPaginateWithAuth(
    @Req() req: Request,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const user = req.user;
    return await this.blogService.getAllWithPaginateWithAuth({
      pageOptionsDto,
      user,
    });
  }
  @Get('/search')
  async getBlogWithSearchAndType(
    @Query() getBlogRequest: GetBlogBySearchAndFeedTypeRequest,
  ) {
    this.LOG.debug('get blog-section with search and type');
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

    return {
      message: 'to implement',
    };
  }

  @Post('like')
  @UseGuards(AuthGuard)
  async likeBlog(@Req() req: Request, @Body() body: UpdateLikeToBlogRequest) {
    const blogId = body.blogId;
    const blogExist = await this.blogService.getById({
      blogId: blogId,
    });

    if (!blogExist) {
      throw new HttpException('blog-section not found', HttpStatus.NOT_FOUND);
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

  @Post('bookmark')
  @UseGuards(AuthGuard)
  async bookmarkBlog(
    @Req() req: Request,
    @Body() body: UpdateBookmarkToBlogRequest,
  ) {
    const blogId = body.blogId;
    const blogExist = await this.blogService.getById({
      blogId: blogId,
    });

    if (!blogExist) {
      throw new HttpException('blog-section not found', HttpStatus.NOT_FOUND);
    }

    const user = req.user;

    const blogToUserExist = await this.blogToUserService.getByBlogIdAndUserId({
      blogId: blogId,
      userId: user.userId,
    });

    const isBookmarked = body.isBookmarked;
    if (blogToUserExist) {
      await this.blogToUserService.updateBookmark({
        blogToUser: blogToUserExist,
        isBookmarked: isBookmarked,
      });
    } else {
      await this.blogToUserService.create({
        blog: blogExist,
        user: user,
        isBookmarked: isBookmarked,
      });
    }

    return {
      blogId: blogId,
      isBookmarked: isBookmarked,
    };
  }

  // sort by date of bookmarked
  @Get('bookmark/all')
  @UseGuards(AuthGuard)
  async getAllBookmarkBlog(
    @Req() req: Request,
    @Query() query: GetAllBookmarksWithPaginationQuery,
  ) {
    const bookmarkedList = await this.blogService.getBookmarkedBlogWithPaginate(
      {
        page: query.page,
        user: req.user,
        dateBookmarkLastBlog: query.dateLastBlogList,
      },
    );
    return {data: bookmarkedList};
  }

  @Get('all/sourceblog')
  @UseGuards(AuthGuard)
  async getAllSourceBlog(
    @Req() req: Request,
    @Query() query: GetBlogsForSourceBlogRequest,
  ) {
    return await this.blogService.getAllWithPaginateWithAuth({
      pageOptionsDto: query.pageOption,
      user: req.user,
      sourceBlogId: query.sourceBlogId,
    });
  }
}
