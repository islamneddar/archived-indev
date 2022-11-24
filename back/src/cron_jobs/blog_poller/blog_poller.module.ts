import { Module } from '@nestjs/common';
import {FeedBlogService} from "../../bussiness/feed_blog/feed_blog.service";
import {FeedBlogModule} from "../../bussiness/feed_blog/feed_blog.module";
import {BlogPollerService} from "./blog_poller.service";

@Module({
    imports : [FeedBlogModule],
    providers : [BlogPollerService]
})
export class BlogPollerModule {}
