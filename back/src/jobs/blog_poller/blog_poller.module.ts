import {Module} from '@nestjs/common';
import {FeedBlogModule} from '@/bussiness/domain-blog/feed-blog/feed_blog/feed_blog.module';
import BlogPollerService from './blog_poller.service';
import {BlogModule} from '@/bussiness/domain-blog/blog/blog.module';
import {SourceBlogModule} from '@/bussiness/domain-blog/source-blog/source_blog.module';
import {TagModule} from '@/bussiness/domain-blog/tag/tag.module';

@Module({
  imports: [FeedBlogModule, BlogModule, SourceBlogModule, TagModule],
  providers: [BlogPollerService],
})
export class BlogPollerModule {}
