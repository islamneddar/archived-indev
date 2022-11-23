import {Controller, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {SourceBlogService} from "./source_blog.service";

@Controller('source-blog')
export class SourceBlogController {
    constructor(private sourceBlogSource : SourceBlogService) {
    }

    @Post()
    create(@Req() req : Request) {

        this.sourceBlogSource.create()
    }
}
