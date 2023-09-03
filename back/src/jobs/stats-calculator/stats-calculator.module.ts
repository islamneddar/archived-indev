import {Module} from '@nestjs/common';
import {FeedBlogTypeStatsModule} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.module';
import {StatsCalculatorService} from '@/jobs/stats-calculator/stats-calculator.service';
import {AiToolCategoryModule} from '@/bussiness/domains/ai-tool/ai-tool-category/ai-tool-category.module';

@Module({
  imports: [FeedBlogTypeStatsModule, AiToolCategoryModule],
  providers: [StatsCalculatorService],
})
export class StatsCalculatorModule {}
