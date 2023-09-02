import {Controller} from '@nestjs/common';
import {FeedBlogTypeStatsService} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.service';

@Controller('feed_blog_stats')
export class FeedBlogStatsController {
  constructor(
    private readonly feedBlogStatsService: FeedBlogTypeStatsService,
  ) {}

  /*@Get('by_max_blog')
  @UseGuards(AuthGuard)
  async findByMaxBlogNumber() {
    const sourceBlog = await this.feedBlogStatsService.findByMaxBlogNumber();
    return {
      data: sourceBlog,
    };
  }*/
}
