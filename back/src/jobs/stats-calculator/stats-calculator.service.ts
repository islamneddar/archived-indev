import {Injectable} from '@nestjs/common';
import {FeedBlogTypeStatsService} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.service';
import {Cron, CronExpression} from '@nestjs/schedule';
import * as process from 'process';

@Injectable()
export class StatsCalculatorService {
  constructor(
    private readonly feedBlogStatsService: FeedBlogTypeStatsService,
  ) {}

  @Cron(
    process.env.NODE_ENV === 'production'
      ? CronExpression.EVERY_DAY_AT_1AM
      : CronExpression.EVERY_10_HOURS,
  )
  async handleCron() {
    await this.feedBlogStatsService.findByMaxBlogNumber();
  }
}
