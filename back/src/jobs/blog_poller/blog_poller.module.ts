import {Module} from '@nestjs/common';
import {FeedBlogModule} from '@/bussiness/domains/blog/feed-blog/feed_blog/feed_blog.module';
import BlogPollerService from './blog_poller.service';
import {BlogModule} from '@/bussiness/domains/blog/blog/blog.module';
import {SourceBlogModule} from '@/bussiness/domains/blog/source-blog/source_blog.module';
import {TagModule} from '@/bussiness/domains/blog/tag/tag.module';

@Module({
  imports: [FeedBlogModule, BlogModule, SourceBlogModule, TagModule],
  providers: [BlogPollerService],
})
export class BlogPollerModule {}
