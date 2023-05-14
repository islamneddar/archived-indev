import {Module} from '@nestjs/common';
import {FeedBlogModule} from '../../bussiness/feed_blog/feed_blog.module';
import BlogPollerService from './blog_poller.service';
import {BlogModule} from '../../bussiness/blog/blog.module';
import {SourceBlogModule} from '../../bussiness/source_blog/source_blog.module';
import {TagModule} from '../../bussiness/tag/tag.module';

@Module({
  imports: [FeedBlogModule, BlogModule, SourceBlogModule, TagModule],
  providers: [BlogPollerService],
})
export class BlogPollerModule {}
