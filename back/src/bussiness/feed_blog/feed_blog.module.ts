import { Module } from '@nestjs/common';
import { FeedBlogController } from './feed_blog.controller';
import { FeedBlogService } from './feed_blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBlogEntity } from './feed_blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBlogEntity])],
  controllers: [FeedBlogController],
  providers: [FeedBlogService],
  exports: [FeedBlogService],
})
export class FeedBlogModule {}
