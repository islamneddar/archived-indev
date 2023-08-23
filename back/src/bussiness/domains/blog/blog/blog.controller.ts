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
  GetAllBlogByFollowedBlogs,
  GetAllBlogBySearchTitleRequest,
  GetAllBookmarksWithPaginationQuery,
  GetBlogsForSourceBlogRequest,
  UpdateBookmarkToBlogRequest,
  UpdateLikeToBlogRequest,
} from './blog.proto';
import {AuthGuard} from '@/bussiness/auth/auth.guard';
import {BlogToUserService} from '@/bussiness/domains/blog/blog-user/blog-user.service';
import {PageDto} from '@/common/pagination/page.dto';
import {PageMetaDto} from '@/common/pagination/page_meta.dto';

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
      message: await this.blogService.getWithPaginateBySearch(
        pageOptionsDto,
        'vue',
      ),
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

  @Get('all/with-auth/by-followed-source-blog')
  @UseGuards(AuthGuard)
  async getAllByFollowedSourceBlog(
    @Req() req: Request,
    @Query() query: GetAllBlogByFollowedBlogs,
  ) {
    const user = req.user;
    if (query.followedBlogs && query.pageOption) {
      return await this.blogService.getAllWithPaginateWithAuth({
        user,
        pageOptionsDto: query.pageOption,
        isFollowingBlogs: query.followedBlogs,
      });
    }

    return new PageDto(
      [],
      new PageMetaDto({
        itemCount: 0,
        pageOptionsDto: query.pageOption,
      }),
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

  @Post('search')
  @UseGuards(AuthGuard)
  async getAllBlogBySearchTitle(
    @Req() req: Request,
    @Query() query: GetAllBlogBySearchTitleRequest,
  ) {
    const user = req.user;
    return await this.blogService.getAllWithPaginateWithAuth({
      pageOptionsDto: query.pageOption,
      textSearch: query.text,
      user: user,
      isFollowingBlogs: query.withFollowedSourceBlog,
    });
  }
}
