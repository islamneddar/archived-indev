import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FeedBlogStatsEntity} from '@/bussiness/feed-blog/feed-blog-type-stats/feed-blog-type-stats-entity';
import {FeedBlogTypeStatsService} from '@/bussiness/feed-blog/feed-blog-type-stats/feed-blog-type-stats.service';
import {FeedBlogStatsController} from '@/bussiness/feed-blog/feed-blog-type-stats/feed-blog-type-stats.controller';
import {UserModule} from '@/bussiness/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBlogStatsEntity]), UserModule],
  controllers: [FeedBlogStatsController],
  providers: [FeedBlogTypeStatsService],
  exports: [FeedBlogTypeStatsService],
})
export class FeedBlogTypeStatsModule {}
