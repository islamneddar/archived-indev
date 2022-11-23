import {Controller, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {SourceBlogService} from "./source_blog.service";
import {SourceBlogEntity} from "./source_blog.entity";
import LOG from "../../utils/logger";

@Controller('source-blog')
export class SourceBlogController {
    constructor(private sourceBlogSource : SourceBlogService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Req() req: Request) {
        const sourceBlog = req.body as SourceBlogEntity;
        LOG.info(sourceBlog)
        await this.sourceBlogSource.save(sourceBlog)
    }
}
