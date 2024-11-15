import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FeedBlogStatsEntity} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats-entity';
import {FeedBlogTypeStatsService} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.service';
import {FeedBlogStatsController} from '@/bussiness/domains/blog/feed-blog/feed-blog-type-stats/feed-blog-type-stats.controller';
import {UserModule} from '@/bussiness/domains/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBlogStatsEntity]), UserModule],
  controllers: [FeedBlogStatsController],
  providers: [FeedBlogTypeStatsService],
  exports: [FeedBlogTypeStatsService],
})
export class FeedBlogTypeStatsModule {}
