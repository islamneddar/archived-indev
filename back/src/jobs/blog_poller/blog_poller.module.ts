import {Module} from '@nestjs/common';
import {FeedBlogModule} from '@/bussiness/blog-domain/feed-blog/feed_blog/feed_blog.module';
import BlogPollerService from './blog_poller.service';
import {BlogModule} from '@/bussiness/blog-domain/blog/blog.module';
import {SourceBlogModule} from '@/bussiness/blog-domain/source-blog/source_blog.module';
import {TagModule} from '@/bussiness/blog-domain/tag/tag.module';

@Module({
  imports: [FeedBlogModule, BlogModule, SourceBlogModule, TagModule],
  providers: [BlogPollerService],
})
export class BlogPollerModule {}
