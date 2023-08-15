import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {FeedBlogService} from './feed_blog.service';
import {CreateFeedBlogRequest} from './interface';

@Controller('feed-blog-section')
export class FeedBlogController {
  constructor(private readonly feedBlogService: FeedBlogService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() request: Request, @Res() res: Response) {
    const createFeedBlogRequest = request.body as CreateFeedBlogRequest;
    if (createFeedBlogRequest.urlFeed.length === 0) {
      throw new HttpException('wrong argument', HttpStatus.BAD_REQUEST);
    }
    const feedExist = await this.feedBlogService.findOne(createFeedBlogRequest);
    if (feedExist) {
      res.status(HttpStatus.OK).json({
        message: 'feed already exist',
      });
      return;
    }
    await this.feedBlogService.save(createFeedBlogRequest);
    res.status(HttpStatus.CREATED).json({
      message: 'feed created',
    });
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const feeds = await this.feedBlogService.getAll();
    res.status(HttpStatus.OK).json({
      feeds,
    });
  }
}
