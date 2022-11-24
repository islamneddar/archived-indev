import { Module } from '@nestjs/common';
import {FeedBlogModule} from "../../bussiness/feed_blog/feed_blog.module";
import {BlogPollerService} from "./blog_poller.service";
import {BlogModule} from "../../bussiness/blog/blog.module";
import {SourceBlogModule} from "../../bussiness/source_blog/source_blog.module";

@Module({
    imports : [FeedBlogModule, BlogModule, SourceBlogModule],
    providers : [BlogPollerService]
})
export class BlogPollerModule {}
