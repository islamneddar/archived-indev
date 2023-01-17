import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FeedBlogService } from './feed_blog.service';
import { Request, Response } from 'express';
import { CreateFeedBlogRequest } from './interface';

@Controller('feed-blog')
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
    return;
  }
}
