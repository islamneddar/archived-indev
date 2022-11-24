import {Controller, HttpCode, HttpException, HttpStatus, Post, Req} from '@nestjs/common';
import {FeedBlogService} from "./feed_blog.service";
import {Request} from "express";
import {CreateFeedBlogRequest} from "./interface";

@Controller('feed-blog')
export class FeedBlogController {
    constructor(private readonly feedBlogService: FeedBlogService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() request: Request) {
        const createFeedBlogRequest = request.body as CreateFeedBlogRequest
        if (createFeedBlogRequest.urlFeed.length === 0) {
            throw new HttpException("wrong argument", HttpStatus.BAD_REQUEST)
        }
        await this.feedBlogService.save(createFeedBlogRequest)
    }

}
