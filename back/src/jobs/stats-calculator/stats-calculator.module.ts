import {Module} from '@nestjs/common';
import {FeedBlogTypeStatsModule} from '@/bussiness/domain-blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.module';
import {StatsCalculatorService} from '@/jobs/stats-calculator/stats-calculator.service';

@Module({
  imports: [FeedBlogTypeStatsModule],
  providers: [StatsCalculatorService],
})
export class StatsCalculatorModule {}
